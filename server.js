let express = require('express')
let bodyParser = require('body-parser')
let logger = require('morgan')
let mongoose = require('mongoose')
let path = require('path')
let moment = require('moment')

let PORT = 3000

let db = require('./models')

let scrape = require('./scripts/scrape')

let app = express()

app.use(logger('dev'))

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise
mongoose.connect(MONGODB_URI, {
  // useMongoClient: true
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Serve static content
app.use(express.static('public'))

// Set Handlebars.
let exphbs = require('express-handlebars')

var hbs = exphbs.create({
  helpers: {
    getDate: function (dateTime) { return moment(dateTime).format('YYYY-MM-DD')},
    getTime: function (dateTime) { console.log(moment(dateTime).format('HH:mm')); return moment(dateTime).format('HH:mm')}
  },defaultLayout: 'main'
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

console.log('get hbs')

require('./controllers/fetch')(app)
require('./controllers/headline')(app)
require('./controllers/note')(app)

// Start the server
app.listen(PORT, function () {
  console.log('App running on port ' + PORT + '!')
})
