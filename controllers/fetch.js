var mongoose = require('mongoose');
var express = require('express');
var path = require('path');

let scrape = require('../scripts/scrape');
// Require all models
let db = require('../models')



module.exports = function(app){

    function deleteHeadline(){
        db.Headline.remove({}, function(err, data){
            if(err){
                console.log(err)
            }else{
                console.log(data);
                console.log("----------------------------------")
                console.log("Headline deleted successfully")
                console.log("----------------------------------")
            }
        })
    }
    app.get('/scrape', function (req, res) {
        console.log("here");
        var data = []
        deleteHeadline();

        scrape.axiosScrape(function (err, data) {
            if (err) {
                console.log(err)
            } else {
                // console.log(data)
                console.log('done scraping')
                //console.log(data);
                //console.log(data.length);


                data.forEach(function (value) {
                    db.Headline.create(value)
                        .then(function (dbHeadline) {
                            //console.log(dbHeadline);
                        })
                        .catch(function (err) {
                            return res.json(err);
                        })
                });
               
            }
        }) 
        res.redirect("/");
    });
}
