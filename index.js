var express = require('express');

var app = express();
var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.send('hello world??');
    res.send('goodbye world')
})

app.listen(port);

console.log("Server running at http://localhost:%d", port);

// var http = require('http');

// var server = http.createServer(function(request, response) {

//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello World??");

// });

// var port = process.env.PORT || 1337;
// server.listen(port);

// console.log("Server running at http://localhost:%d", port);
