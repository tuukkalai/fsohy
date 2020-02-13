const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://foolstack:u6BG9WVG5DXJUYw14@cluster0-emt58.mongodb.net/blog-app?retryWrites=true&w=majority'

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(console.log('Connected to mongo'))
  .catch(error => console.log('Error connecting to mongo' , error))

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  console.log('request.body', request.body)
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.log('Error adding doc to blog', error))
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
