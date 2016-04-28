// Default controller
var Services = require('./service-client');

function index(req, res){
    var thisRes = res;
    var apiClient = new Services(req, '/api/places');
    apiClient.get(function(err, res){
        console.log(res);
        thisRes.render('index', {
            title: 'Home Express',
            visited_place: JSON.parse(res)
        });
    });
}

function users(req, res){
    var thisRes = res;
    var apiClient = new Services(req, '/api/places');
    apiClient.get(function(err, res){
        console.log(res);
        thisRes.render('users', {
            title: 'Users Express',
            visited_place: JSON.parse(res)
        });
    });
}

function about(req, res){
    var thisRes = res;
    var apiClient = new Services(req, '/api/places');
    apiClient.get(function(err, res){
        console.log(res);
        thisRes.render('about', {
            title: 'About Express'
        });
    });
}

function add_place(req, res){
    var thisRes = res;
    var apiClient = new Services(req, '/api/places');
    if(req.method != 'GET'){
        apiClient.post(req.body, function(err, res){
            console.log(res);
            thisRes.redirect('/');
        });
    }else{
        res.render('add-place', {
            title: 'Add Express'
        });
    }
}

function edit_place(req, res){
    var thisRes = res;
    var apiClient = new Services(req, '/api/places');
    if(req.method != 'GET'){
        apiClient.put(req.body, function(err, res){
            console.log(res);
            thisRes.redirect('/');
        });
    }else{
        apiClient.get(function(err, res){
            console.log(res);
            thisRes.render('edit-place', {
                title: 'Edit Express',
                visited_place: JSON.parse(res)
            });
        });
    }
}

function delete_place(req, res){
    var thisRes = res;
    var apiClient = new Services(req, '/api/places');
    if(req.method != 'GET'){
        apiClient.delete(function(err, res){
            console.log(res);
            thisRes.redirect('/');
        });
    }else{
        apiClient.get(function(err, res){
            console.log(res);
            thisRes.render('delete-place', {
                title: 'Delete Express',
                visited_place: JSON.parse(res)
            });
        });
    }
}

module.exports.wire = function(app){
    // render index view
    app.get('/', index);

    // render users view
    app.get('/users', users);

    // render about view
    app.get('/about', about);

    // render add view
    app.get('/add-place', add_place);

    // post added places to server
    app.post('/add-place', add_place);

    // render edit view
    app.get('/place/:id', edit_place);

    // post user data to server from edit view
    app.post('/place/:id', edit_place);

    // render delete view
    app.get('/place/delete/:id', delete_place);

    // post delete data to server
    app.post('/place/delete/:id', delete_place);
};

