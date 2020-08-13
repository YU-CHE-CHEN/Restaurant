const express = require('express')
const router = express.Router()

const restaurantLists = require('../../models/restaurantList')

router.get('/', (req, res) => {
  restaurantLists.find()
    .lean()
    .then(Lists => res.render('index', { Lists }))
    .catch(error => console.error(error))
})

module.exports = router
