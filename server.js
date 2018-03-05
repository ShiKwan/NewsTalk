let express = require('express')
let bodyParser = require('body-parser')
let logger = require('morgan')
let mongoose = require('mongoose')
var path = require('path')

var PORT = 3000

// Require all models
let db = require('./models')

let scrape = require('./scripts/scrape')

// Initialize Express
let app = express()

// Configure middleware

// Use morgan logger for logging requests
app.use(logger('dev'))
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }))
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'))
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise
mongoose.connect(MONGODB_URI, {
  // useMongoClient: true
})

app.use(express.static('app/public'))

app.use(bodyParser.json())
var exphbs = require('express-handlebars')

var hbs = exphbs.create({
    helpers: {
        getDate: function (dateTime) { return moment(dateTime).format('YYYY-MM-DD') },
        getTime: function (dateTime) { console.log(moment(dateTime).format('HH:mm')); return moment(dateTime).format('HH:mm') }
    }, defaultLayout: 'main'
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

let fetch = require('./controllers/fetch')(app);
let headline = require('./controllers/headline')(app);
let note = require('./controllers/note')(app);


// Start the server
app.listen(PORT, function () {
  console.log('App running on port ' + PORT + '!')
})
