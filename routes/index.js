var express = require('express');
var router = express.Router();
var visitedplace = require('../testdata.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express-LearnCode',
        visitedplace: visitedplace
    });
});

module.exports = router;
