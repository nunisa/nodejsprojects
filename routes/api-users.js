var express = require('express');
var router = express.Router();
var app = express();

var User = require('../models/user');
require('../db-config')(app);

router.get('/', function(req, res){
    User.find(function(err, users){
        if(err) throw err;
        res.json(users);
    });
});

router.post('/', function(req, res){
    var username = (req.body.username != undefined)?req.body.username:req.query.username;
    var password = (req.body.password != undefined)?req.body.password:req.query.password;
    var user = new User({
        username: username,
        password: password
    });
    user.save(function(err){
        if (err) throw err;
        res.json({message: 'User Created'});
    });
});

router.get('/:id', function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user){
        if (err) throw err;
        res.json(user);
    });
});

router.put('/:id', function(req, res){
    var username = (req.body.username != undefined)?req.body.username:req.query.username;
    var password = (req.body.password != undefined)?req.body.password:req.query.password;
    User.update({
            _id: req.params.id
        },
        {
            username: username,
            password: password
        },
        function(err, user){
            if (err) throw err;
            res.json(user);
        });
});

router.delete('/:id', function(req, res){
    User.remove({ _id: req.params.id }, function(err, user){
        if (err) throw err;
        res.json(user);
    });
});

module.exports = router;