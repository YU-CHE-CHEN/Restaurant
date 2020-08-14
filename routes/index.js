const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const lists = require('./modules/lists')
const search = require('./modules/search')


router.use('/', home)
router.use('/lists', lists)
router.use('/search', search)


module.exports = router