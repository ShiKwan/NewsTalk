var mongoose = require('mongoose')
var express = require('express')
var path = require('path')

// Require all models
let db = require('../models')

module.exports = function (app) {

  // Route for saving/updating an Article's associated Note
  app.post('/headlines/:id', function (req, res) {
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id
    // and update it's "note" property with the _id of the new note
    let id = req.params.id
    console.log('req body of note is.. ')
    console.log(req.body)
    let note = new db.Note(req.body)

    note.save(function (err, data) {
      if (err) {
        console.log(err)
      }else {
        console.log(data)
        db.Headline.findOneAndUpdate({_id: id}, {$push: {note: data._id}}, {new: true, upsert: true})
          .populate('note')
          .exec(function (err, doc) {
            if (err) {
              console.log(err)
            // console.log("Headline not found")
            }else {
              console.log(doc.note)
              console.log('Note saved.. ')
              res.json(doc)
            }
          })
      }
    })
  })

  app.delete('/note/:id', function (req, res) {
    let id = req.params.id
    db.Note.remove({_id: id}, function (err) {
      if (err) {
        console.log(err)
        res.send(err);
      }else{
          console.log("note with " + id + " deleted successfully.");
          res.sendStatus(200);
      }
    })
  })
}
