const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://kaanbsaglam:${password}@fullstackopen.nqizt.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstackopen`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

/* const person = new Person({
  name: 'Arto Halkias',
  number: 111-222-33-33,
}) */

const savePerson = (name,number) => {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log('note saved:')
        console.log(result)
        mongoose.connection.close()
    })
}

const getAllPeople = () => Person.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

if(process.argv.length == 3){
    getAllPeople()
}
else if (process.argv.length == 5){
    savePerson(process.argv[3],process.argv[4])
}
else{
    console.log("invalid number of arguments")
    mongoose.connection.close()
}



