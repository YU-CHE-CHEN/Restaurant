const express = require('express')
const router = express.Router()

const restaurantLists = require('../../models/restaurantList')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, rating, location, phone, google_map, description } = req.body
  const image = req.body.image !== '' ? req.body.image : undefined
  return restaurantLists.create({ name, category, image, rating, location, phone, google_map, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurantLists.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantLists.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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
    .then(() => res.redirect(`/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return restaurantLists.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

module.exports = router