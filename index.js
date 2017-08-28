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
