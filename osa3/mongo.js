const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const pName = process.argv[3]
const pNumber = process.argv[4]


const url = `mongodb+srv://foolstack:${password}@cluster0-emt58.mongodb.net/person-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
})

const Person = mongoose.model('Person', personSchema)

if(!pName){
  console.log('phonebook:')
  Person.find({}).then(res => {
    res.forEach(p => {
      console.log(p.name + ' ' + p.number)
    })
    mongoose.connection.close()
  })
}else{
  const person = new Person({
    name: pName,
    number: pNumber
  })

  person.save().then(response => {
    console.log(`Added ${pName} number ${pNumber} to phonebook`);
    mongoose.connection.close();
  })
}