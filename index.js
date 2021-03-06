var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');

var app = express();
var sql = require('./sql.js')

var sqlop = new sql()

var secret = 'daryldaryl'

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use('/assets', express.static(__dirname + '/assets'));

var port = process.env.PORT || 1337;



app.get('/', function (req, res) {
    res.sendFile('./index.html', {root: __dirname});
})

app.get('/test', function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.end("Hello World??");
})

app.post('/login', function (req, res) {
    console.log(req.body)
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    if (/^[a-z0-9_]+$/i.test(user.username)) {
        sqlop.login(user, function (results) {
            if (results.length == 1) {
                var token = jwt.sign({
                    data: user
                }, secret, { expiresIn: '100 days' });

                res.send({
                    success: true,
                    access_token: token
                })
            } else {
                res.send({
                    success: false,
                    message: 'Wrong username or password.'
                })
            }
        })
    } else {
        res.send({
            success: false,
            message: 'Wrong username or password.'
        })
    }

})
app.get('/user', function (req, res) {
    console.log(req.headers)
    console.log(req.headers.authorization)
    res.send({
        user: "user"
    })
})


app.listen(port);

console.log("Server is running", port);