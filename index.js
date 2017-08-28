var express = require('express');

var app = express();
var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World????????");
})

app.get('/test', function (req, res) {
    json = {
        name: 'test'
    }
    res.send(json)
})

app.listen(port);

console.log("Server is running", port);

// var http = require('http');

// var server = http.createServer(function(request, response) {

//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello World??");

// });

// var port = process.env.PORT || 1337;
// server.listen(port);

// console.log("Server running at http://localhost:%d", port);
