let express = require('express')
let bodyParser = require('body-parser')
let logger = require('morgan')
let mongoose = require('mongoose')

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

var data = []

scrape.axiosScrape(function (err, data) {
  if (err) {
    console.log(err)
  }else {
    // console.log(data)
    console.log('done scraping')
  }
})

// Start the server
app.listen(PORT, function () {
  console.log('App running on port ' + PORT + '!')
})
