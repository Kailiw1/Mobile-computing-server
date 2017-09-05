<<<<<<< HEAD
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

// "b\uf8ff"
var reff = defaultDatabase.ref("check-in").orderByChild('time');
reff.startAt("2017-09-05 00").endAt("2017-09-05 00\uf8ff").on("value", function (snapshot) {
    console.log(snapshot.val());
});
=======
var ss = '2017-09-05 09:32'
var tt =  new Date(ss)
var ls =  new Date(ss).toLocaleString()

console.log(tt)
console.log(tt.getTime())
console.log(Date.now())
>>>>>>> 675f7426b5a88d38349d584f0370d5d1664ff2d7
