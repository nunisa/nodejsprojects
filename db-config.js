var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);

var ConnectifyMongo = function(app) {
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
};

module.exports = ConnectifyMongo;