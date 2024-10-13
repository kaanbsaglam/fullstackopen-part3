const express = require('express')
const app = express()

app.use(express.json())


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

const generateId = () => {
  return Math.floor(Math.random() * 10000000000).toString()
}

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

app.get('/info', (request,response) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`
  response.send(info)
})

app.get('/api/persons/:id', (request,response) => {
  const requestedId = request.params.id
  const person = persons.find(p => p.id == requestedId)
  if(!person){
    return response.status(404).end()
  }
  response.json(person)
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
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(newPerson)
  response.json(persons)


})

const PORT = 3001
app.listen(PORT, () => {
    console.log('server running on port ', PORT)    
})