// Add city name in the visited city list
var express = require('express');
var router = express.Router();
var Services = require('./service-client');

/*POST form data*/
router.post('/', function(req, res) {
    var thisRes = res;
    var apiClient = new Services();
    apiClient.post('/api/places', req.body, function(err, res){
        thisRes.redirect('/');
    });
});

module.exports = router;