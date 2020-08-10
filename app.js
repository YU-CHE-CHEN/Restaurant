//require package uses in the project
const express = require('express')
const app = express()
const port = 3000

//require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurants.json')

//add and connect the mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose errror!')
})
db.once('open', () => {
  console.log('mongoose connected!')
})

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }
))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//route setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

//start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})