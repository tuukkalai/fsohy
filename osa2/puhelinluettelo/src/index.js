import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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