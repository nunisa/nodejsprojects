// Add city name in the visited city list
var express = require('express');
var router = express.Router();
var visitedplace = require('../testdata.json');

/*POST form data*/
router.post('/', function(req, res) {
    var newCity = req.body.city;
    var newState = req.body.state;
    visitedplace.visited.push({
        "city": newCity,
        "state": newState
    });
    res.redirect('/');
});

module.exports = router;