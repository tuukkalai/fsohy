import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      // console.log('promise fulfilled', response.data)
      setPersons(response.data)
    })
  },[])
  // console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(newName === ''){
      alert('Field "Name" is required')
      return
    }
    if(persons.some(p => p.name === newName)){
      alert(`${newName} already added to phonebook!`)
      return
    }
    const personObj = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new number</h2>
      <PersonForm handleSubmit={handleSubmit} handleNumber={handleNumberChange} handleName={handleNameChange} name={newName} number={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))