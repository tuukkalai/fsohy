require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body', function (req) { return JSON.stringify(req.body) })

// First page
app.get('/info', (req, res) => {
  Person.find({}).then(p => {
    res.send(`<p>Phonebook has info for ${p.length} person${p.length === 1 ? '' : 's'}</p><p>${new Date}</p>`)
  })
})

// Persons: Create
app.post('/api/persons', (req, res, next) => {
  if(!req.body.name){
    return res.status(400).json({
      error: 'Name missing'
    })
  }
  if(!req.body.number){
    return res.status(400).json({
      error: 'Number missing'
    })
  }
  const person = Person({
    name: req.body.name,
    number: req.body.number
  })
  console.log('New person to be created:', person)
  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormatted => {
      res.json(savedAndFormatted)
    })
    .catch(error => next(error))
})

// Persons: Read
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => persons.map(p => p.toJSON()))
    .then(personsFormatted => {
      res.json(personsFormatted)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person){
      res.json(person.toJSON())
    }else{
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

// Persons: Delete
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// Persons: Update
app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => updatedPerson.toJSON())
    .then(updatedAndFormatted => {
      res.json(updatedAndFormatted)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
