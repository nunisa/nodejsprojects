var http = require('http');
var querystring = require('querystring');

function Services(){}

Services.prototype.get = function(url, callback){
    if(url == '') return callback(err, res);
    var options = {
        host: 'localhost',
        port: 3000,
        path: url,
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
        host: 'localhost',
        port: 3000,
        path: url+'?'+post_data,
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

module.exports = Services;