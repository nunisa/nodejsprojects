var express = require('express');
var router = express.Router();
var Services = require('./service-client');

/* GET home page. */
router.get('/', function(req, res, next) {
    var thisRes = res;
    var apiClient = new Services();
    apiClient.get('/api/places', function(err, res){
        console.log(res);
        thisRes.render('index', {
            title: 'Express-LearnCode',
            visitedplace: JSON.parse(res)
        });
    });
});

module.exports = router;
