var db = require('./neo4j.js')
var dbop = new db()

var http = require('http');

var qs = require('querystring');

var data = {
    username: 123
}


var content = qs.stringify(data);

var options = {
    hostname: '192.168.1.5',
    port: 1337,
    path: '/checkin',
    method: 'GET',
    Cookie:'connect.sid=s%3AKR3AwfUOclN6o4x-SBmwgXuAjnR5V0hj.Dk5jsoUM2jBzz%2Fhka8SclJ%2BZl2FAUU%2BhvexCF2RMtUQ; Path=/; HttpOnly'
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});

req.end();
