import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { initBlogs, createBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { setNotification, zeroNotification } from './reducers/notificationReducer'
import { login, logout } from './reducers/loginReducer'
import { initUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from 'react-router-dom'

const App = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)


  useEffect(() => {
    userService
      .getUsers()
      .then(users => {
        dispatch(initUsers(users))
      })
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const usr = JSON.parse(loggedUserJSON)
      dispatch(login(usr))
    }else{
      dispatch(logout())
    }
  }, [dispatch])

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
      dispatch(login(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification([`Wrong credentials`, true]))
      setTimeout(() => {
        dispatch(zeroNotification())
      }, 5000)
    }
  }

  const createBlog = async (blogObj) => {    
    blogFormRef.current.toggleVisibility()
    const addedBlog = await blogService.create(blogObj)
    dispatch(createBlogs(addedBlog))
    dispatch(setNotification([`new blog ${addedBlog.title} by ${addedBlog.author} added (redux)`, false]))
    setTimeout(() => {
      dispatch(zeroNotification())
    }, 5000)
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={createBlog} />
    </Togglable>
  )

  const handleLike = async ({ blog }) => {
    try {
      const updatedBlog = {...blog, likes: blog.likes + 1}
      await blogService.update(blog.id, updatedBlog)
      dispatch(likeBlog(updatedBlog))
      dispatch(setNotification([`Like added to ${blog.title}!`, false]))
      setTimeout(() => {
        dispatch(zeroNotification())
      }, 5000)
    } catch (exception) {
      dispatch(setNotification([`Something went wrong!`, true]))
    setTimeout(() => {
      dispatch(zeroNotification())
    }, 5000)
    }
  }

  const handleDelete = async ({ blog }) => {
    try {
      if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        dispatch(deleteBlog(blog))
        dispatch(setNotification([`Blog deleted`, false]))
        setTimeout(() => {
          dispatch(zeroNotification())
        }, 5000)
      }

    } catch (exception) {
      dispatch(setNotification([`Something went wrong deleting blog`, true]))
    setTimeout(() => {
      dispatch(zeroNotification())
    }, 5000)
    }
  }

  const blogList = () => (
    <table>
      <tbody>
      {blogs.map(b => (
        <Blog key={b.id} blog={b} handleDelete={handleDelete} handleLike={handleLike} />
      ))}
      </tbody>
    </table>
  )

  const userList = () => {
    return (
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Nr of blogs</th>
          </tr>
          {users.map(u => (
            <Users key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    )
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logout())
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

  const padding = {
    padding: 10
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/users">Users</Link>
      </div>

      <Switch>
        <Route path="/users">
          { user === null
            ? ( <Redirect to="/login" /> )
            : ( userList() )
          }
        </Route>
        <Route path="/login">
          { user !== null 
            ? ( <Redirect to="/" /> )
            : ( loginForm() )
          }
        </Route>
        <Route path="/">
          {user === null
            ? ( <Redirect to="/login" /> )
            : ( <div>
                  <Notification />
                  <div>
                    <h2>blogs</h2>
                    <p>Logged in as { user.name }</p>
                    <button onClick={() => {handleLogout()}}>Logout</button>
                    { blogForm() }
                    { blogList() }
                  </div>
                </div>
              )
          }
        </Route>
      </Switch>
    </Router>
    
  )
}

export default App