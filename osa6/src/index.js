import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const average = all === 0 ? 0 : (good-bad)/all
    const positive = all === 0 ? 0 : good*100/all
    if ( all === 0 ){
      return <p>No feedback given</p>
    }else{
      return (
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{ store.getState().good }</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{ store.getState().ok }</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{ store.getState().bad }</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{ all }</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{ average }</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{ positive } %</td>
            </tr>
          </tbody>
        </table>
      )
    }
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={good}>hyvä</button> 
      <button onClick={neutral}>neutraali</button> 
      <button onClick={bad}>huono</button>
      <button onClick={zero}>nollaa tilastot</button>
      <div>
        <h2>Statistics</h2>
        <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
      </div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)