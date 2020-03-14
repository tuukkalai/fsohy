import anecdoteService from '../services/anecdotes'

const byVotes = (a1, a2) => a2.votes - a1.votes

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type){
    case 'VOTE':
      const voted = action.data
      return state.map(a => a.id===voted.id ? voted : a).sort(byVotes)
    case 'NEW_ANECDOTE':
      console.log(action.data)
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort(byVotes)
    default:
      return state
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const toVote = {...anecdote, votes: anecdote.votes + 1}
    const data = await anecdoteService.update(toVote)
    dispatch({
      type: 'VOTE',
      data
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
<<<<<<< Updated upstream
      data: newAnecdote
=======
      data
>>>>>>> Stashed changes
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data
    })
  }
}

export default reducer