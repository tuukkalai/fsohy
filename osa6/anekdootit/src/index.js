import React from 'react'
import ReactDOM from 'react-dom'
//import { createStore } from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App'
//import reducer from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

import store from './store'
import { initAnecdotes } from './reducers/anecdoteReducer'

anecdoteService.getAll().then(notes =>
  store.dispatch(initAnecdotes(notes))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)