const mongoose = require('mongoose')
const restaurantList = require('../restaurantList')
const RestaurantList = require('./restaurants.json')
mongoose.connect('mongodb://localhost/Restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose errror!')
})
db.once('open', () => {
  console.log('mongoose connected!')
  for (i = 0; i < RestaurantList.results.length; i++) {
    restaurantList.create(RestaurantList.results[i])
  }
  console.log('Created!')
})