const express = require('express')
const router = express.Router()

const restaurantLists = require('../../models/restaurantList')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  restaurantLists.find({ name: { $regex: keyword, $options: "i" } })
    .lean()
    .then(Lists => res.render('index', { Lists: Lists, keyword }))
    .catch(error => console.error(error))
})

module.exports = router