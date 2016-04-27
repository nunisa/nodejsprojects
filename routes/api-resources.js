var express = require('express');
var router = express.Router();
var monk = require('monk');

var uri = process.env.PROD_MONGODB || 'localhost:27017/learncodenodejs';
var db = monk(uri);

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

router.get('/:id', function(req, res) {
    var collection = db.get('visited_places');
    collection.findOne({ _id: req.params.id }, function(err, place){
        if (err) throw err;
        res.json(place);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('visited_places');
    collection.update({
            _id: req.params.id
        },
        {
            name: req.query.name,
            city: req.query.city,
            state: req.query.state
        }, function(err, place){
            if (err) throw err;
            res.json(place);
        });
});

router.delete('/:id', function(req, res){
    var collection = db.get('visited_places');
    collection.remove({ _id: req.params.id }, function(err, place){
        if (err) throw err;
        res.json(place);
    });
});

module.exports = router;