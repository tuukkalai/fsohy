import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(props.anecdotes.length + 1).join('0').split('').map(parseFloat))

  const randomInt = function(num){
    return Math.floor(Math.random() * Math.floor(num))
  }

  const addVote = function(num){
    const copy = [...points]
    copy[num] += 1
    setPoints(copy)
  }

  function mostVotes(){
    let suurinPisteet = 0
    let suurinNum = 0
    for(let i = 0; i <= props.anecdotes.length; i++){
      if(points[i] >= suurinPisteet){
        suurinPisteet = points[i]
        suurinNum = i
      }
    }
    return suurinNum
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <button onClick={() => addVote(selected)}>vote</button>
      <button onClick={() => setSelected(randomInt(props.anecdotes.length))}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[mostVotes()]}<br />has {points[mostVotes()]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)