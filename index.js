// var express = require('express');

// var app = express();
// var port = process.env.PORT || 1337;

// app.get('/', function (req, res) {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     res.send('hello world??');
// })
// app.get('/test', function (req, res) {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     res.send('hello world????????');
// })

// app.listen(port);

// console.log("Server running at http://localhost:%d", port);

var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello 123");

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
