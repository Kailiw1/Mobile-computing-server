var db = require('./neo4j.js')
var dbop = new db()


var user = {
  username: 'admin',
  password: 'lilolp',
  // email: 'grantward@hotmail.com'
}
var place = {
  name: 'Squires Loft',
  lat: -37.8188447,
  lng: 144.9440415,
  vicinity: '818 Bourke Street, Melbourne',
  username: 'daryl',
  time: 1504321902483
}

/**
 * login 
 */
// dbop.checkplace(place, function (records) {
//   console.log(records)
//   if (!records.length)
//     console.log('0 result')

//   records.forEach(function (record) {
//     console.log(record);
//   });
// })


var registrationTokens = [];

registrationTokens.push('aaa')
registrationTokens.push('bbb')
registrationTokens.push('ccc')

var index = registrationTokens.indexOf('bbb')
if (index > -1) {
  registrationTokens.splice(index, 1);
}
console.log(registrationTokens)
