var mongoose = require('mongoose')
var express = require('express')
var path = require('path')

let scrape = require('../scripts/scrape')
// Require all models
let db = require('../models')

module.exports = function (app) {
  let objHeadline = []
  app.post('/scrape', function (req, res) {
    scrape.axiosScrape(function (err, data) {
      if (err) {
        console.log(err)
      } else {
        objHeadline.dbHeadline = data
        res.render('home', objHeadline)
        objHeadline.length = 0;
      }
    })
  })
  app.get('/scrape', function (req, res) {
    scrape.axiosScrape(function (err, data) {
      if (err) {
        console.log(err)
      } else {
        objHeadline.dbHeadline = data
        res.render('home', objHeadline)
        objHeadline.length = 0;
      }
    })
  })
}
