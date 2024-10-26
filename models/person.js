const mongoose = require('mongoose')


mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url).then(() => {
  console.log('connected to mongodb')
}).catch(error => {
  console.log('error connecting to mongoDB', error.message)
})

function numberPatternValidator (number) {
  return /\d{2,3}-\d+/.test(number)
}


const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate:{
      validator: numberPatternValidator,
      message: props => `${props.value} - Numbers have to be in this pattern 22-3334445566 or 444-5556667788`
    }
  }
})

phonebookSchema.set('toJSON', {
  transform: (document,returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', phonebookSchema)

module.exports = Person



