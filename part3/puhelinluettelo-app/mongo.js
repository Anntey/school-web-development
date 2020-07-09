// lisäys: node mongo.js yourpassword "Arto Vihavainen" 040-1234556
// kaikkien tiedot: node mongo.js yourpassword

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const inputName = process.argv[3]
const inputNumber = process.argv[4]

const dbUrl = `mongodb+srv://fsuser:${password}@fullstackcluster1-magqt.mongodb.net/phone-app?retryWrites=true&w=majority`

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const generateId = () => {
  return Math.floor(Math.random() * (200 - 1)) + 1
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: inputName,
  number: inputNumber,
  id: generateId(),
})

if (inputName === undefined & inputNumber === undefined) {
  Person
    .find({})
    .then(result => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
} else {
  person
    .save()
    .then(res => {
      console.log('Person saved!')
      mongoose.connection.close()
    })
}



