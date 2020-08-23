//require package uses in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const restaurantLists = require('./models/restaurantList')
const app = express()
const port = 3000
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes')
const { use } = require('./routes')
require('./config/mongoose')






//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }
))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

//setting express-session
app.use(session({
  secret: 'ThisiIsMySecret',
  resave: false,
  saveUninitialized: true
}))


//start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})