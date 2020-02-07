const express = require('express')
const app = express()

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

app.get('/', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  person !== undefined ? res.json(person) : res.send('Person was not found')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
