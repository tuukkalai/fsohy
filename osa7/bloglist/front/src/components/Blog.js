import React from 'react'

const Blog = ({ blog, handleDelete, handleLike }) => {

  const likeBlog = () => {
    handleLike({ blog })
  }

  const deleteBlog = () => {
    handleDelete({ blog })
  }


  return (
    <tr>
      <td>{blog.title}</td>
      <td>{blog.author}</td>
      <td><button onClick={likeBlog}>{blog.likes} likes</button></td>
      <td><button onClick={deleteBlog}>&times;</button></td>
    </tr>
  )
}

export default Blog