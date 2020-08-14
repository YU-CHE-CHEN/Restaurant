const express = require('express')
const router = express.Router()

const restaurantLists = require('../../models/restaurantList')

router.get('/:option/:sort', (req, res) => {
  const sortby = {
    nameasc: '餐廳名稱(A->Z)',
    namedesc: '餐廳名稱(Z->A)',
    categoryasc: '類別',
    locationasc: '地區'
  }
  const name = req.params.option
  const sort = req.params.sort
  const select = `${name}${sort}`

  restaurantLists.find()
    .lean()
    .sort({ [name]: sort })
    .then(Lists => res.render('index', { Lists, sortby: sortby[select] }))
    .catch(error => console.error(error))
})

module.exports = router