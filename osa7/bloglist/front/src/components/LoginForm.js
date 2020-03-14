import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {
  console.log('LoginForm called')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    console.log('username', username)
    handleSubmit({ username, password })

    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>login to app</h2>
      <form onSubmit={login}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm