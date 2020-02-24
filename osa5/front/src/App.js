import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState([ '', false ])

  useEffect(() => {
    blogService
      .getAll()
      .then(initBlogs => {
        setBlogs(initBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(['wrong credentials', true])
      setTimeout(() => {
        setErrorMessage(['', false])
      }, 5000)
    }
  }

  const createBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    const addedBlog = await blogService.create(blogObj)
    setBlogs(blogs.concat(addedBlog))
    setErrorMessage([`new blog ${addedBlog.title} by ${addedBlog.author} added`, false])
    setTimeout(() => {
      setErrorMessage(['', false])
    }, 5000)
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={createBlog} />
    </Togglable>
  )

  const blogList = () => (
    <div>
      {blogs.map(b => (
        <Blog key={b.id} blog={b} />
      ))}
    </div>
  )

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const loginForm = () => (
    <div>
      <h2>login to app</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification message={ errorMessage } />
      { user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>Logged in as { user.name }</p>
          <button onClick={() => {handleLogout()}}>Logout</button>
          { blogForm() }
          { blogList() }
        </div>
      }
    </div>
  )
}

export default App