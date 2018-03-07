var mongoose = require('mongoose')
var express = require('express')
var path = require('path')

// Require all models
let db = require('../models')

module.exports = function (app) {
  app.get('/', function (req, res) {
    var objHeadlines = []
    res.render('home', objHeadlines)
  })

  app.get('/headline', function (req, res) {
    let allHeadline = {}
    db.Headline.find({})
      .then(function (dbHeadline) {
        allHeadline.dbHeadline = dbHeadline
        res.render('saved', allHeadline)
      // res.json(headlines)
      })
      .catch(function (err) {
        res.json(err)
      })
  })

  app.get('/headline/:id', function (req, res) {
    let id = req.params.id
    db.Headline.find({_id: id})
      .populate('note')
      .then(function (headline) {
        res.json(headline)
      })
      .catch(function (err) {
        res.json(err)
      })
  })

  app.post('/headline', function (req, res) {
    console.log(req.body.title)
    let allHeadline = {}
    let objHeadline = {
      title: req.body.title,
      date: req.body.date,
      link: req.body.link,
      teaser: req.body.teaser
    }
    console.log(objHeadline)
    var entry = new db.Headline(objHeadline)
    entry.findOneAndUpdate(function(err, saved){
      if (err) {
        console.log("found duplicates?");
        console.log(err)
      }else {
        console.log(saved)
        db.Headline.find({})
          .then(function (dbHeadline) {
            console.log(dbHeadline)
            allHeadline.dbHeadline = dbHeadline
            res.render('saved', allHeadline)
          // res.json(allHeadline)
          })
      }
    })
  })
}
