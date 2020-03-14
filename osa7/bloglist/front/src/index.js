import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
/*
import blogService from './services/blogs'
import { initBlogs } from './reducers/blogReducer'
*/

/*
blogService.getAll().then(blogs =>
  store.dispatch(initBlogs(blogs))
)
*/

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('root'))