const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
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
    .catch(error => console.log('Error adding blog to DB', error))
})

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
