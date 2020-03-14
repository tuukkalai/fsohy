import React from 'react'

const Users = ({ user }) => {
  return(
    <tr><td>{user.username}</td><td>{user.blogs.length}</td></tr>
  )
}

export default Users