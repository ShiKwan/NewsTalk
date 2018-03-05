var mongoose = require('mongoose');
var express = require('express');
var path = require('path');

// Require all models
let db = require('../models')


module.exports = function (app) {
    app.get("/", function(req, res){
        db.Headline.find({})
        .then(function(dbHeadline){
            res.json(dbHeadline);
        })
        .catch(function(err){
            res.json(err);
        })
    })

    app.get('/headlines', function(req, res){
        db.Headline.find({})
        .then(function(headlines){
            res.json(headlines);
        })
        .catch(function(err){
            res.json(err);
        })
    } )

    app.get('/headlines/:id', function(req, res){
        let id = req.params.id;
        db.Headline.find({_id:id})
        .populate("note")
        .then(function(headline){
            res.json(headline);
        })
        .catch(function(err){
            res.json(err);
        })
    })

};