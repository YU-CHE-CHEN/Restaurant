//require package uses in the project
const express = require('express')
const app = express()
const port = 3000

//require express-handlebars here
const exphbs = require('express-handlebars')

const restaurantLists = require('./models/restaurantList')
const bodyParser = require('body-parser')

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

//setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//route setting
app.get('/', (req, res) => {
  restaurantLists.find()
    .lean()
    .then(Lists => res.render('index', { Lists }))
    .catch(error => console.error(error))
})
app.get('/lists/new', (req, res) => {
  return res.render('new')
})

app.post('/lists', (req, res) => {
  const name = req.body.name
  return restaurantLists.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/lists/:id', (req, res) => {
  const id = req.params.id
  return restaurantLists.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/lists/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantLists.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/lists/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, rating, location, phone, google_map, description } = req.body
  const image = req.body.image !== '' ? req.body.image : "https://upload.cc/i1/2020/07/22/QU9vWD.png"
  return restaurantLists.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/lists/${id}`))
    .catch(error => console.log(error))
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