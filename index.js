require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { default: mongoose } = require('mongoose')

const app = express()


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(cors())

app.use(express.json())

app.use(express.static('dist'))

morgan.token('post-data', (req,res) => req.method === "POST" ? JSON.stringify(req.body) : "")

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))



const generateId = () => {
  return Math.floor(Math.random() * 10000000000).toString()
}

app.get('/api/persons', (request,response) => {
    Person.find({}).then(result => {
      response.json(result)
    })
})

app.get('/info', (request,response) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`
  response.send(info)
})

/* app.get('/api/persons/:id', (request,response) => {
  const requestedId = request.params.id
  const person = persons.find(p => p.id == requestedId)
  if(!person){
    return response.status(404).end()
  }
  response.json(person)
}) */

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)

  })
})

app.delete('/api/persons/:id', (request,response) => {
  const requestedId = request.params.id
  persons = persons.filter(p => p.id !== requestedId)
  response.status(204).end()
})

app.post('/api/persons', (request,response) => {
  const body = request.body
  if(!body){
    return response.status(400).json({
      error: "content missing"
    })
  }
  else if(!body.name || !body.number){
    return response.status(400).json({
      error: "name and/or number is missing"
    })
  }
  else if(persons.some(p => p.name == body.name)){
    return response.status(409).json({
      error: `person with the same name ${body.name} exists` 
    })
  }
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })
  newPerson.save().then(result => {
    response.json(newPerson)

  })
  


})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('server running on port ', PORT)    
})