const mongoose = require('mongoose')

if (process.argv.length <3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fso:${password}@fsop3-ry9b2.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
console.log("connected")
const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phoneSchema)

if (process.argv.length == 3) {
  console.log("reached")
  //print results of phonebook
  Person.find({}).then(result => {
    console.log(result)
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length == 5) {
  //adds number to phonebook
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then( result => {
    console.log(`added ${result}`)
    mongoose.connection.close()
  })
}
