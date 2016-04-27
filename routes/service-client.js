var http = require('http');
var querystring = require('querystring');

var port = normalizePort(process.env.PORT || '5000');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function Services(){}

Services.prototype.get = function(req, url, callback){
    if(url == '') return callback(err, res);
    var reqURL = 'http://mynodedev.herokuapp.com';
    if(req.params.id == undefined) reqURL += url;
    else reqURL += url+'/'+req.params.id;
    var options = {
        host: 'mynodedev.herokuapp.com',
        port: port,
        path: reqURL,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var temp = http.request(options, function(res){
        res.on('data', function(data){
            var response = data.toString('utf8');
            callback(null, response);
        });
    });
    temp.end();
};

Services.prototype.post = function(url, form_data, callback){
    if(url == '') return callback(err, res);
    var post_data = querystring.stringify(form_data);
    var options = {
        host: 'mynodedev.herokuapp.com',
        port: port,
        path: 'http://mynodedev.herokuapp.com'+url+'?'+post_data,
        method: 'POST',
        headers: {
            accept: 'application/json'
        }
    };
    var temp = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            callback(null, chunk);
        });
    });
    temp.end();
};

Services.prototype.put = function(req, url, form_data, callback){
    if(url == '') return callback(err, res);
    var put_data = querystring.stringify(form_data);
    var reqURL = 'http://mynodedev.herokuapp.com';
    if(req.params.id == undefined) return callback(err, res);
    else reqURL += url+'/'+req.params.id+'?'+put_data;
    var options = {
        host: 'mynodedev.herokuapp.com',
        port: port,
        path: reqURL,
        method: 'PUT',
        headers: {
            accept: 'application/json'
        }
    };
    var temp = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            callback(null, chunk);
        });
    });
    temp.end();
};

Services.prototype.delete = function(req, url, callback){
    if(url == '') return callback(err, res);
    var reqURL = 'http://mynodedev.herokuapp.com';
    if(req.params.id == undefined) return callback(err, res);
    else reqURL += url+'/'+req.params.id;
    var options = {
        host: 'mynodedev.herokuapp.com',
        port: port,
        path: reqURL,
        method: 'DELETE',
        headers: {
            accept: 'application/json'
        }
    };
    var temp = http.request(options, function(res){
        res.on('data', function (data) {
            var response = data.toString('utf8');
            callback(null, response);
        });
    });
    temp.end();
};

module.exports = Services;