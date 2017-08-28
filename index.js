var express = require('express');

var app = express();
var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
<<<<<<< HEAD
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World????????");
=======
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World??");
>>>>>>> 94b08b039ab08759aa2757f33e922d9c6ffbe13c
})

app.get('/test', function (req, res) {
    json = {
        name: 'test'
    }
    res.send(json)
})

app.listen(port);

console.log("Server is running", port);


