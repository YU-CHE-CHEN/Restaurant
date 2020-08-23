const express = require('express')
const router = express.Router()

const restaurantLists = require('../../models/restaurantList')

router.get('/', (req, res) => {
  const userId = req.user._id
  restaurantLists.find({ userId })
    .lean()
    .then(Lists => res.render('index', { Lists }))
    .catch(error => console.error(error))
})

module.exports = router
