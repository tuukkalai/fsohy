import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const aanesta = anecdote => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`You voted anecdote '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => aanesta(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default AnecdoteList