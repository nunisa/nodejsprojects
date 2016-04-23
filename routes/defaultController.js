// Default controller
var Services = require('./service-client');

function index(req, res){
    var thisRes = res;
    var apiClient = new Services();
    apiClient.get('/api/places', function(err, res){
        console.log(res);
        thisRes.render('index', {
            title: 'Home Express',
            visitedplace: JSON.parse(res)
        });
    });
}

function users(req, res){
    var thisRes = res;
    var apiClient = new Services();
    apiClient.get('/api/places', function(err, res){
        console.log(res);
        thisRes.render('users', {
            title: 'Users Express',
            visitedplace: JSON.parse(res)
        });
    });
}

function about(req, res){
    var thisRes = res;
    var apiClient = new Services();
    apiClient.get('/api/places', function(err, res){
        console.log(res);
        thisRes.render('about', {
            title: 'About Express'
        });
    });
}

function add_places(req, res){
    var thisRes = res;
    var apiClient = new Services();
    apiClient.post('/api/places', req.body, function(err, res){
        thisRes.redirect('/');
    });
}

module.exports.wire = function(app){
    // index
    app.get('/', index);

    // users
    app.get('/users', users);

    // about
    app.get('/about', about);

    // add places to db
    app.post('/add', add_places);
};

