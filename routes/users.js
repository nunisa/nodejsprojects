var express = require('express');
var router = express.Router();
var visitedplace = require('../testdata.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users', {
        title: 'Express-LearnCode-Users',
        visitedplace: visitedplace
    });
});

module.exports = router;
