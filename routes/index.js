var express = require('express');
var router = express.Router();
var model = require('../models/index');

router.get('/', function(req, res, next) {

    model.Page.find(function(err, docs) {
        res.render('index', {title: '', docs: docs});

    })
});

router.get('/error/', function(req, res, next) {
    
    model.Page.find(function(err, docs) {
        res.render('error', {title: 'error', docs: docs});
    
    })
});

module.exports = router;