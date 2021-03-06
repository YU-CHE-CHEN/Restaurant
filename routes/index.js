const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const lists = require('./modules/lists')
const search = require('./modules/search')
const sort = require('./modules/sort')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')


router.use('/users', users)
router.use('/lists', authenticator, lists)
router.use('/search', authenticator, search)
router.use('/sort', authenticator, sort)
router.use('/auth', auth)
router.use('/', authenticator, home)


module.exports = router