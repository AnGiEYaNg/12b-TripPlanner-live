var express = require('express');
var router = express.Router();
var models = require('../models/index');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var ThingToDo = models.ThingToDo;
//var app=require('../app');


router.get('/', function(req, res, next) {

	//app.initialize_gmaps();

	Hotel.find({}, function(err, hotels) {
	    Restaurant.find({}, function(err, restaurants) {
	        ThingToDo.find({}, function(err, thingsToDo) {
	            res.render('index', {
	                all_hotels: hotels,
	                all_restaurants: restaurants,
	                all_things_to_do: thingsToDo
	            });
	        });
	    });
	});
});

router.get('/error/', function(req, res, next) {
    
    //models.Page.find(function(err, docs) {
        res.render('error', {title: 'error', docs: docs});
    
    //})
});

module.exports = router;