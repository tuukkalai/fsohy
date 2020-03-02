import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    const newAnec = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(newAnec))
    dispatch(setNotification(`You added new anecdote '${newAnec}'`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm