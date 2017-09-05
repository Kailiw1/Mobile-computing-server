// var admin = require("firebase-admin");

// var serviceAccount = require("./my-project-1503314481057-firebase-adminsdk-tq32j-a1583fdc4f.json");

// var defaultApp = admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://my-project-1503314481057.firebaseio.com"
// });


// console.log(defaultApp.name);  // "[DEFAULT]"

// // Retrieve services via the defaultApp variable...
// var defaultAuth = defaultApp.auth();
// var defaultDatabase = defaultApp.database();
// //

// // "b\uf8ff"
// var reff = defaultDatabase.ref("check-in").orderByChild('time');
// reff.startAt("2017-09-05 00").endAt("2017-09-05 00\uf8ff").on("value", function (snapshot) {
//     console.log(snapshot.val());
// });
console.log(new Date().toDateString())
console.log(new Date('Tue Sep 05 2017'))
console.log(new Date('Tue Sep 05 2017').getTime())