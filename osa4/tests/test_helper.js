const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First test',
    author: 'Eka',
    url: 'http://example.com/1',
    likes: 1
  },
  {
    title: 'Second test',
    author: 'Toka',
    url: 'http://example.com/2',
    likes: 2
  },
  {
    title: 'Third test',
    author: 'Kolmas',
    url: 'http://example.com/3'
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}