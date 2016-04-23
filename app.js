var express = require('express');
var engine  = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// var routes = require('./routes/index');
// var users = require('./routes/users');
// var about = require('./routes/about');
// var add_places = require('./routes/add');
var resources = require('./routes/api-resources');

var app = express();

// app.locals.visitedplace = require('./testdata.json');

// view engine setup
app.set('views', path.join(__dirname, '/views/'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

// app.use('/', routes);
// app.use('/users', users);
// app.use('/about', about);
// app.use('/add', add_places);
app.use('/api/places', resources);

// wire request 'pre' actions
wirePreRequest(app);

// wire request controllers
var defaultController = require('./routes/defaultController');
defaultController.wire(app);

// wire request 'post' actions
wirePostRequest(app);

function wirePreRequest(app){
    app.use(function (req, res, next) {
        console.log(req.method +" "+ req.url);
        res.locals.req = req;
        res.locals.res = res;
        if(res.statusCode != 200){
            throw new Error('Something went wrong while trying to process your request.')
        }else{
            next();
        }
    });
}

function wirePostRequest(app){
    app.use(function(err, req, res, next){
        if(err){
            return next();
        }
        if (res.statusCode != 200){
            res.status(err.status || 404);
            res.render('error', {
                message: err.message,
                error: err
            });
        }else{
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        }
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stack traces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
