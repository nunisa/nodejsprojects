var express = require('express');
var router = express.Router();
var app = express();

var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var Place = require('../models/place');

app.use(session({
    secret: 'secret_key',
    cookie: {maxAge: 1209600000},
    store: new MongoStore({
        url: process.env.PROD_MONGODB
    }),
    resave: true,
    saveUninitialized: true
}));

try {
    var uri = process.env.PROD_MONGODB || 'localhost:27017/learncodenodejs';
    console.log('Connecting to ', uri);
    mongoose.connect(uri, {}, function(err){
        if(err) {
            console.log('Connection Error ::: ', err);
        } else {
            console.log('Successfully Connected');
        }
    });
} catch(e) {
    console.log("Caught exception trying to connect to database");
    console.log(e);
    console.log(e.message);
    console.log(e.stack);
}

router.get('/', function(req, res){
    Place.find(function(err, places){
        if(err) throw err;
        res.json(places);
    });
});

router.post('/', function(req, res){
    var place = new Place({
        name: req.query.name,
        city: req.query.city,
        state: req.query.state
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
    Place.update({
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
    Place.remove({ _id: req.params.id }, function(err, place){
        if (err) throw err;
        res.json(place);
    });
});

module.exports = router;