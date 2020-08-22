const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const lists = require('./modules/lists')
const search = require('./modules/search')
const sort = require('./modules/sort')
const users = require('./modules/users')



router.use('/', home)
router.use('/lists', lists)
router.use('/search', search)
router.use('/sort', sort)
router.use('/users', users)


module.exports = router