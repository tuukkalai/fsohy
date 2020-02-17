const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

var token = ''

describe('Blogs initially saved', () => {
  beforeAll(async () => {
    await User.deleteMany({})
    await api
      .post('/api/users')
      .send(helper.testUser)

    const result = await api
      .post('/api/login')
      .send({ username: 'testaaja', password: 'Sikret' })

    token = result.body.token
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('the third blog title is correct', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[2].title).toBe('Third test')
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)

    expect(titles).toContain(
      'Second test'
    )
  })

  test('id field called id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  describe('Viewing specific blog', () => {
    test('succeeds with valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const result = await api
        .get(`/api/blogs/${blogsAtStart[0].id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(result.body).toEqual(blogsAtStart[0])
    })

    test('fails with status 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '1nv4l1dID'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('Adding new blogs', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Uusi bloggaaja',
        url: 'http://example.com/uusi',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const title = blogsAtEnd.map(r => r.title)
      expect(title).toContain('async/await simplifies making async calls')
    })

    test('blog without title is not added', async () => {
      const newBlog = {
        author: 'Invalid test author',
        url: 'http://example.com/invalid-test',
        likes: 5
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('blog without url is not added', async () => {
      const newBlog = {
        title: 'Invalid blog post',
        author: 'Invalid test author',
        likes: 5
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('blog without likes is set to 0', async () => {
      const newBlog = {
        title: 'Zero points',
        author: 'Zero point blogger',
        url: 'http://example.com/zero-points'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const blog = blogsAtEnd.filter(b => b.title === 'Zero points')
      expect(blog[0].likes).toBe(0)
    })


    test('adding blog fails if no token', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const newBlog = {
        title: 'No token',
        author: 'N o token',
        url: 'http://example.com/you-guessed-it-right--no-token'
      }
      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('invalid token')
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtStart.length).toBe(blogsAtEnd.length)
    })
  })

  describe('Deletion of a blog', () => {
    test('succeeds with status 204 if id is valid', async () => {

      const blog = {
        title: 'Testaajan lisäämä blogi',
        author: 'Tahvo the Testaaja',
        url: 'http://example.com/testtesttest'
      }

      const newBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(200)

      const blogsAtStart = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${newBlog.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

      const title = blogsAtEnd.map(r => r.title)

      expect(title).not.toContain(newBlog.body.title)
    })

    test('Error if no valid token', async () => {
      const blogsAtStart = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${blogsAtStart[0].id}`)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtStart.length).toBe(blogsAtEnd.length)

      const title = blogsAtEnd.map(r => r.title)

      expect(title).toContain(blogsAtStart[0].title)
    })
  })

  describe('Update blog', () => {
    test('succeeds with 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()

      blogsAtStart[0].title = 'Updated blog material'

      await api
        .put(`/api/blogs/${blogsAtStart[0].id}`)
        .send(blogsAtStart[0])
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
      expect(blogsAtEnd[0].title).toBe('Updated blog material')
    })
  })

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({ username: 'root', password: 'sekret' })
      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('non-unique username fails', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtStart.length).toBe(usersAtEnd.length)
    })

    test('less-than 3 chars password fails', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'invalidPassword',
        name: 'Superluser',
        password: 'XO',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('Password too short')
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtStart.length).toBe(usersAtEnd.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})