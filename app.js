var express = require('express');
var request = require('request');
var app = express();
app.get('/', function(req, res) {
        var url = 'http://localhost:3000/webapp/index.html';
        req.pipe(request(url)).pipe(res);
    })
    .use(express.static('public'))
    .listen(3000);
console.log('server start');
