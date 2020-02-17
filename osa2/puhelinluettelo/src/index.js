import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'
import styled from 'styled-components'

const Container = styled.div`
  width: 600px;
  max-width: 96%;
  margin: 0 auto;
`

const App = () => {  

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState([ '', false ])

  useEffect(() => {
    personService.getAll().then(res => {
      setPersons(res.data)
    })
  },[])

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
      setErrorMessage([`Field "Name" is required`, true])
      setTimeout(() => {
        setErrorMessage(['', false])
      }, 5000)
      return
    }
    if(persons.some(p => p.name === newName)){
      const upPerson = persons.find(p => p.name === newName)
      if(window.confirm(`${upPerson.name} already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(upPerson.id, {...upPerson, number: newNumber})
          .then(res => {
            setErrorMessage([`Person ${upPerson.name} updated`, false])
            setTimeout(() => {
              setErrorMessage(['', false])
            }, 5000)
            setPersons(persons.map(p => p.id !== upPerson.id ? p : res.data))            
            setNewName('')
            setNewNumber('')            
          })
          .catch( error => {
            setErrorMessage([`Person ${upPerson.name} was not updated`, true])
            setTimeout(() => {
              setErrorMessage(['',false])
            }, 5000)
          })
      }
      return
    }
    const personObj = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObj)
      .then(res => {
        setErrorMessage([`Person ${res.data.name} created`, false])
        setTimeout(() => {
          setErrorMessage(['', false])
        }, 5000)
        setPersons(persons.concat(res.data))
        setNewName('')
        setNewNumber('')
      })
      .catch( error => {
        setErrorMessage([`${error.response.data.error}`, true])
        setTimeout(() => {
          setErrorMessage(['', false])
        }, 5000)
      })
  }

  const deletePerson = (p) => {
    if(window.confirm(`Delete ${p.name}?`)){
      personService
        .deletePerson(p.id)
        .then(() => {
          setErrorMessage([`Person ${p.name} deleted`, false])
          setTimeout(() => {
            setErrorMessage(['', false])
          }, 5000)
          setPersons(persons.filter(person => person.id !== p.id))
        }).catch( error => {
          setErrorMessage([`Person ${p.name} has already been deleted from server`, true])
          setTimeout(() => {
            setErrorMessage(['', false])
          }, 5000)
          setPersons(persons.filter(person => person.id !== p.id))
        })
      }
  }


  return (
    <Container>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new number</h2>
      <PersonForm handleSubmit={handleSubmit} handleNumber={handleNumberChange} handleName={handleNameChange} name={newName} number={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={deletePerson} />
    </Container>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))