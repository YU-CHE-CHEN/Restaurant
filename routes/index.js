const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const lists = require('./modules/lists')
const search = require('./modules/search')
const sort = require('./modules/sort')



router.use('/', home)
router.use('/lists', lists)
router.use('/search', search)
router.use('/sort', sort)



module.exports = router