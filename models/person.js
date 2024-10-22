const mongoose = require('mongoose')


mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => {
    console.log("connected to mongodb")
}).catch(error => {
    console.log('error connecting to mongoDB', error.message)
})


const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
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

/* const savePerson = (name,number) => {
    const person = new Person({
        name:name,
        number:number
    })
    person.save().then(result=> {
        console.log("person saved")
        console.log(result)
        mongoose.connection.close()
    })
} */


