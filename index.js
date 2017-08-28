var express = require('express');

var app = express();
var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World??");
})

app.listen(port);

console.log("Server is running", port);


