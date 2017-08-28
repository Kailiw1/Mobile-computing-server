var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser')


var app = express();
var db = require('./neo4j.js')
var dbop = new db()

var store = new redisStore()

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
    store: store,
    resave: false,
    saveUninitialized: true,
    secret: 'mobile'
}))

var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World??");
})

app.get('/test', function (req, res) {
    res.send({
        name: 'test',
        password: 'test'
    })
})

app.listen(port);

console.log("Server is running", port);


