const restaurantList = require('../restaurantList')
const RestaurantList = require('./restaurants.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongoose connected!')
  for (i = 0; i < RestaurantList.results.length; i++) {
    restaurantList.create(RestaurantList.results[i])
  }
  console.log('Created!')
})