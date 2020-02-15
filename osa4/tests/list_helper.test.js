const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithMultipleBlogs = [
  {
    _id: '5e45ad9cf1c13c16f2994f00',
    title: 'Test blog otsikko',
    author: 'Blogailija von Mogailija',
    url: 'http://example.com',
    likes: 9,
    __v:0
  },
  {
    _id: '5e463c4347e9d815b9a49089',
    title: 'Test kakkonen',
    author: 'Bloggaaja nr 2',
    url: 'http://example.com/2',
    likes: 2,
    __v: 0,
  },
  {
    _id: '5e468897ff17ed819550d8a9',
    title: 'Test kolmonen',
    author: 'Bloggaaja nr 3',
    url: 'http://example.com/3',
    likes: 3,
    __v: 0,
  }
]

const favoriteBlog = {
  _id: '5e45ad9cf1c13c16f2994f00',
  title: 'Test blog otsikko',
  author: 'Blogailija von Mogailija',
  url: 'http://example.com',
  likes: 9,
  __v:0
}

describe('total likes', () => {

  test('of empty list is 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(14)
  })

})

describe('favorite blog', () => {
  test('show the most liked blog', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(favoriteBlog)
  })
})