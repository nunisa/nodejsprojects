var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/learncodenodejs');

router.get('/', function(req, res){
    var collection = db.get('visited_places');
    collection.find({}, function(err, places){
        if(err) throw err;
        res.json(places);
    });
});

router.post('/', function(req, res){
    var collection = db.get('visited_places');
    collection.insert({
        name: req.query.name,
        city: req.query.city,
        state: req.query.state
    }, function(err, place){
        if (err) throw err;
        res.json(place);
    });
});

module.exports = router;