var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser')
var redis = require("redis");

// Add your cache name and access key.
var client = redis.createClient(6380, 'mobileRedis.redis.cache.windows.net', { auth_pass: 'IC73+zPPdjNo+qFca9eh9SMX3X+S4tZsHd19scuBEfM=', tls: { servername: 'mobileRedis.redis.cache.windows.net' } });


var app = express();
var db = require('./neo4j.js')
var dbop = new db()

var store = new redisStore({ client: client })

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


var admin = require("firebase-admin");

var serviceAccount = require("./my-project-1503314481057-firebase-adminsdk-tq32j-a1583fdc4f.json");

var defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my-project-1503314481057.firebaseio.com"
});


console.log(defaultApp.name);  // "[DEFAULT]"

// Retrieve services via the defaultApp variable...
var defaultAuth = defaultApp.auth();
var defaultDatabase = defaultApp.database();
//
//

// These registration tokens come from the client FCM SDKs.
var registrationTokens = [];





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
    var user = {
        username: req.body.username,
        password: req.body.password
    }

    dbop.login(user, function (records) {
        if (!records.length) {
            res.send({ login: 'wrong' })
        }
        else {
            req.session.user = user
            res.send({ login: 'ok' })
            if (req.body.token)
                registrationTokens.push(req.body.token)


        }
    })
})
app.post('/new_user',function(req,res){
    
})
app.post('/register', function (req, res) {
    var user = req.body
    user.status = Date.now()
    dbop.register(user, function (records) {
        if (!records.length)
            res.send({
                register: 'username exists...'
            })
        else {
            req.session.user = user
            res.send({
                register: 'ok'
            })
        }

    })
})
app.post('/checkin_current', function (req, res) {
    var checkin = req.body
    if (req.session.user) {
        checkin.username = req.session.user.username
        checkin.time = Date.now()
        console.log(checkin)
        dbop.checkin_current(checkin, function (records) {
            if (!records.length)
                res.send({ checkin: "checkin failed" })
            else {
                res.send({ checkin: "ok" })
            }
        })
    } else {
        res.send({ checkin: "wrong" })
    }
})
app.post('/checkin', function (req, res) {
    var checkin = req.body
    if (req.session.user) {
        checkin.username = req.session.user.username
        checkin.time = Date.now()
        console.log(checkin)
        dbop.checkplace(checkin, function (records) {
            if (!records.length)
                dbop.checkin_newplace(checkin, function (records) {
                    if (!records.length)
                        res.send({ checkin: 'new place failed' })
                    else {
                        console.log('push message')
                        // See the "Defining the message payload" section below for details
                        // on how to define a message payload.
                        // var payload = {
                        //     data: {
                        //         lat: checkin.lat,
                        //         lng: checkin.lng
                        //     }
                        // };
                        var payload = {
                            data: {
                                score: "850",
                                time: "2:45"
                            }
                        };
                        // Send a message to the devices corresponding to the provided
                        // registration tokens.
                        admin.messaging().sendToDevice(registrationTokens, payload)
                            .then(function (response) {
                                // See the MessagingDevicesResponse reference documentation for
                                // the contents of response.
                                console.log("Successfully sent message:", response);
                            })
                            .catch(function (error) {
                                console.log("Error sending message:", error);
                            });
                        res.send({ checkin: 'new place ok' })
                    }
                })
            else {
                dbop.checkin(checkin, function (records) {
                    if (!records.length)
                        res.send({ checkin: 'checkin place failed' })
                    else {
                        res.send({ checkin: 'checkin place ok' })
                    }
                })
            }

        })
    } else {
        res.send({ checkin: "wrong" })
    }
})

app.get('/update', function (req, res) {

    if (req.session.user) {
        console.log(req.session.user.username, 'update...')
        dbop.update({ username: req.session.user.username }, function (records) {
            var checkinArray = []
            records.forEach(function (record) {
                checkinArray.push({
                    lat: record.get('lat'),
                    lng: record.get('lng'),
                })
            }, this);
            res.send({
                update: checkinArray
            })
            console.log(checkinArray)
            dbop.updatestatus({ time: Date.now(), username: req.session.user.username }, function (records) {
                console.log('update status')
            })

        })
    } else {
        res.send({
            update: "wrong"
        })
    }
})
app.listen(port);

console.log("Server is running", port);


