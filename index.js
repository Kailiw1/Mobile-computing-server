var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser')

var app = express();

app.get('/', function (req, res) {
    res.end('hello world')
})


app.listen(9999);