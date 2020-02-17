require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI

if(process.env.NODE_ENV === 'test'){
  MONGODB_URI = process.env.MONGODB_TEST_URI
}

let PORT = process.env.PORT

module.exports = {
  MONGODB_URI,
  PORT
}