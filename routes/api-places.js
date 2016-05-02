var express = require('express');
var router = express.Router();
var app = express();

var Place = require('../models/place');
require('../db-config')(app);

router.get('/', function(req, res){
    Place.find(function(err, places){
        if(err) throw err;
        res.json(places);
    });
});

router.post('/', function(req, res){
    var name = (req.body.name != undefined)?req.body.name:req.query.name;
    var city = (req.body.city != undefined)?req.body.city:req.query.city;
    var state = (req.body.state != undefined)?req.body.state:req.query.state;
    var place = new Place({
        name: name,
        city: city,
        state: state
    });
    place.save(function(err){
        if (err) throw err;
        res.json({message: 'Created'});
    });
});

router.get('/:id', function(req, res) {
    Place.findOne({ _id: req.params.id }, function(err, place){
        if (err) throw err;
        res.json(place);
    });
});

router.put('/:id', function(req, res){
    var name = (req.body.name != undefined)?req.body.name:req.query.name;
    var city = (req.body.city != undefined)?req.body.city:req.query.city;
    var state = (req.body.state != undefined)?req.body.state:req.query.state;
    Place.update({
            _id: req.params.id
        },
        {
            name: name,
            city: city,
            state: state
        },
        function(err, place){
            if (err) throw err;
            res.json(place);
        });
});

router.delete('/:id', function(req, res){
    Place.remove({ _id: req.params.id }, function(err, place){
        if (err) throw err;
        res.json(place);
    });
});

module.exports = router;