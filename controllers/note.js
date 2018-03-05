

var mongoose = require('mongoose');
var express = require('express');
var path = require('path');

// Require all models
let db = require('../models')


module.exports = function (app) {

// Route for saving/updating an Article's associated Note
app.post("/headlines/:id", function (req, res) {
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id
    // and update it's "note" property with the _id of the new note
    let id = req.params.id;
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
            // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Headline.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
        })
        .then(function (dbHeadline) {
            // If the Library was updated successfully, send it back to the client
            res.json(dbHeadline);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
});
}