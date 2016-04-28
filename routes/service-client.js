var http = require('http');
var querystring = require('querystring');

var Services = function(req, url){
    if(url == '') return callback(err, res);
    var reqURL = '';
    if(req.params.id == undefined) reqURL += url;
    else reqURL += url+'/'+req.params.id;
    this.apiURL = reqURL;
    this.description = {
        host: req.hostname,
        path: reqURL,
        method: '',
        headers: {
            'Content-Type': 'application/json'
        }
    };
};

Services.prototype.get = function(callback){
    this.description.method = 'GET';
    var options = this.description;
    var temp = http.request(options, function(res){
        res.on('data', function(data){
            var response = data.toString('utf8');
            callback(null, response);
        });
    });
    temp.end();
};

Services.prototype.post = function(form_data, callback){
    var post_data = querystring.stringify(form_data);
    this.description.path = this.apiURL+'?'+post_data;
    this.description.method = 'POST';
    var options = this.description;
    var temp = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            callback(null, chunk);
        });
    });
    temp.end();
};

Services.prototype.put = function(form_data, callback){
    var put_data = querystring.stringify(form_data);
    this.description.path = this.apiURL+'?'+put_data;
    this.description.method = 'PUT';
    var options = this.description;
    var temp = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            callback(null, chunk);
        });
    });
    temp.end();
};

Services.prototype.delete = function(callback){
    this.description.method = 'DELETE';
    var options = this.description;
    var temp = http.request(options, function(res){
        res.on('data', function (data) {
            var response = data.toString('utf8');
            callback(null, response);
        });
    });
    temp.end();
};

module.exports = Services;