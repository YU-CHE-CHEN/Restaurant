const express = require('express')
const router = express.Router()

const restaurantLists = require('../../models/restaurantList')

router.get('/', (req, res) => {
  restaurantLists.find()
    .lean()
    .then(Lists => res.render('index', { Lists }))
    .catch(error => console.error(error))
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})


module.exports = router
