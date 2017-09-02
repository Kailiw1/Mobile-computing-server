var db = require('./neo4j.js')
var dbop = new db()
var fs = require('fs');
var http = require('http');
var request = require('request');

var qs = require('querystring');

/**
 * -37.517560   -  -38.426668
 * 
 * 
 * 144.594326    145.506191
 */

/** 
 * register users
 *  
 * */

// var obj = [];
// var i = 1
// while (i < 5000) {
//     obj.push({ username: "test" + i, password: "test" + i, email: "test" + i + "@hotmail.com" });
//     i += 1
// }


// var json = JSON.stringify(obj);

// fs.writeFile('users.json', json, 'utf8', function (err, data) {
//     console.log(data)
// });


/**                                                                     
 * 
 */
// fs.readFile('users.json', 'utf8', function readFileCallback(err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         obj = JSON.parse(data); //now it an object

//         var i = 0, howManyTimes = 1000;
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

//     }
// });


var lat = (Math.random() * (-38.426668 - -37.517560) + -37.517560)
var lng = (Math.random() * (145.506191 - 144.594326) + 144.594326)
var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ", " + lng + "&rankby=distance&key=AIzaSyAeMJIpr7CVFQ7hPXnlr-p80bEhNcg5VIs";

console.log(lat, lng)
request.post(
    url,
    { json: null },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body)
            if (JSON.parse(body).results.length) {
                element = JSON.parse(body).results[0]
                console.log(element.name, element.geometry.location, element.vicinity, '\n')
            } else {
                console.log('no place found')
            }


        } else {
            console.log("error -- " + error)
        }
    }
);

// lat = Math.random() * (-38.426668 - -37.517560) + -37.517560
// lng = Math.random() * (145.506191 - 144.594326) + 144.594326


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