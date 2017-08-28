var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser')


var app = express();
var db = require('./neo4j.js')
var dbop = new db()

var store = new redisStore({
    url: 'mobileRedis.redis.cache.windows.net',
    port: 6380,
    password: 'IC73+zPPdjNo+qFca9eh9SMX3X+S4tZsHd19scuBEfM=',
    ssl: true,
    abortConnect: false
})

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

app.post('/login', function (req, res) {
    // console.log(req.sessionID)
    // console.log(req.headers)
    console.log(req.body)
    var password
    var user = {
        username: req.body.username,
        password: req.body.password
    }

    dbop.login(user, function (records) {
        if (!records.length)
            res.send({
                login: 'wrong'
            })
        else {
            req.session.user = user
            res.send({
                login: 'ok'
            })
        }

    })
});
app.post('/register', function (req, res) {
    var user = req.body

    dbop.register(user, function (records) {
        if (!records.length)
            res.send({
                register: 'username exists'
            })
        else {
            req.session.user = user
            res.send({
                register: 'ok'
            })
        }

    })
})

app.listen(port);

console.log("Server is running", port);


