const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

morgan.token('person', (req, res) => {
  return JSON.stringify(req.body)
})

let phoneList = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2},
  { name: "Dan Abramov", number: "12-43-234345", id: 3},
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4}
]

app.get('/api/persons', (request, response) => {
  response.json(phoneList)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${phoneList.length} people</p><p>${Date().toString()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const person = phoneList.find(person => person.id === Number(request.params.id))
  if(person)
    response.json(person)
  else
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phoneList = phoneList.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
  if(!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing'})
  }

  if(phoneList.some(person => person.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.random()*1000
  }

  phoneList = phoneList.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})
