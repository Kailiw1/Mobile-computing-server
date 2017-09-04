var db = require('./neo4j.js')
var dbop = new db()
var fs = require('fs');
var http = require('http');
var request = require('request');
var querystring = require('querystring');

/**
 * -37.517560   -  -38.426668
 * 
 * 
 * 144.594326    145.506191
 */
// var i = 0, howManyTimes = 1000;
//         function f() {
//             var element = obj[i]
//             element.status = Date.now()

//             dbop.register(element, function (records) {
//                 if (!records.length)
//                     console.log('username exists...', element.username)
//                 else {
//                     // console.log('ok', element.username)
//                 }

//             })
//             i++;
//             if (i < howManyTimes) {
//                 setTimeout(f, 30);
//             }
//         }
//         f();


var lat = (Math.random() * (-38.426668 - -37.517560) + -37.517560)
var lng = (Math.random() * (145.506191 - 144.594326) + 144.594326)
var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ", " + lng + "&rankby=distance&key=AIzaSyAeMJIpr7CVFQ7hPXnlr-p80bEhNcg5VIs";
headers = { 'Cookie': 'connect.sid=s%3A0UZBGBbHfhZQN_qXXL3LgaKNL0aQdiFJ.%2FrMVWkvU8P5b1txoh6iaatxpdu6QwIjr45w%2BDVDiJ4g; Path=/; HttpOnly' }
console.log(lat, lng)
request.post(
    url,
    { json: null },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body)
            if (JSON.parse(body).results.length) {
                var place = JSON.parse(body).results[0]
                // console.log(place.name, place.geometry.location, place.vicinity, '\n')

                checkin(place)

            } else {
                console.log('no place found')
            }


        } else {
            console.log("error -- " + error)
        }
    }
);

var checkin = function (place) {
    var checkin = {
        name: place.name,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        vicinity: place.vicinity
    }

    console.log(checkin)
    // var data = querystring.stringify(checkin);
    // request({
    //     headers: {
    //         'Cookie': 'connect.sid=s%3A0UZBGBbHfhZQN_qXXL3LgaKNL0aQdiFJ.%2FrMVWkvU8P5b1txoh6iaatxpdu6QwIjr45w%2BDVDiJ4g; Path=/; HttpOnly'
    //     },
    //     uri: 'http://192.168.1.5:1337/checkin',
    //     body: checkin,
    //     method: 'POST'
    // }, function (err, res, body) {
    //     console.log(body)
    // });

    request.post({
        url: 'http://192.168.1.5:1337/checkin',
        headers: {
            'Cookie': 'connect.sid=s%3A0UZBGBbHfhZQN_qXXL3LgaKNL0aQdiFJ.%2FrMVWkvU8P5b1txoh6iaatxpdu6QwIjr45w%2BDVDiJ4g; Path=/; HttpOnly'
        },
        form: {
            name: place.name,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            vicinity: place.vicinity
        },
        method: 'POST'
    },



        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)

            } else {
                console.log("error -- " + error)
            }
        }
    );
}
// username: robot password: robot
//'connect.sid=s%3A0UZBGBbHfhZQN_qXXL3LgaKNL0aQdiFJ.%2FrMVWkvU8P5b1txoh6iaatxpdu6QwIjr45w%2BDVDiJ4g; Path=/; HttpOnly'
// request.post(
//     'http://192.168.1.5:1337/login',
//     { json: { username: 'robot', password: 'robot' } },
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(response.headers['set-cookie'])
//             // var user = JSON.parse(body)
//             // console.log(user)
//             // console.log(place.name, place.geometry.location, place.vicinity, '\n')

//         } else {
//             console.log("error -- " + error)
//         }
//     }
// );

// var element = {
//     username: 'robot',
//     password: 'robot',
//     email: 'robot@hotmail.com'
// }
// element.status = Date.now()

// dbop.register(element, function (records) {
//     if (!records.length)
//         console.log('username exists...', element.username)
//     else {
//         // console.log('ok', element.username)
//     }

// })