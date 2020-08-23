const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose errror!')
})

db.once('open', () => {
  console.log('mongoose connected!')
})

module.exports = db