const express = require('express')
const app = express()
const morgan = require('morgan')

/*const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}*/

app.use(express.json())
//app.use(requestLogger)

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-12345678",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-5423122",
      "id": 4
    },
    {
      "name": "Nodemon testi",
      "number": "+358 60 666 6161",
      "id": 666
    }
]


// First page
app.get('/', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date}</p>`)
})

// Persons: Create
app.post('/api/persons', (req, res) => {
  if(!req.body.name){
    return res.status(400).json({
      error: 'Name missing'
    })
  }
  if(persons.find(p => p.name === req.body.name)){
    return res.status(400).json({
      error: 'Name must be unique'
    })
  }
  if(!req.body.number){
    return res.status(400).json({
      error: 'Number missing'
    })
  }
  const person = {
    name: req.body.name,
    number: req.body.number,
    id: Math.floor(Math.random() * Math.floor(32768))
  }
  persons = persons.concat(person)
  res.json(person)
})

// Persons: Read
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  person !== undefined ? res.json(person) : res.status(404).end()
})

// Persons: Delete
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
