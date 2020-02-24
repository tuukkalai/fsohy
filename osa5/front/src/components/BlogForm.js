import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createBlog}>
      title: <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} /><br/>
      author: <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} /><br/>
      url: <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} /><br/>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm