var admin = require("firebase-admin");

var CronJob = require('cron').CronJob;


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

var ref = defaultDatabase.ref("check-in");
var queryRef = defaultDatabase.ref().child('current_check-in')

// Attach an asynchronous callback to read the data at our posts reference
ref.on("child_added", function (snapshot) {
    // console.log(snapshot.key)
    console.log('check-in ', snapshot.val().time)

    var postKey = writeNewPost(snapshot.val().place.lat, snapshot.val().place.lng, snapshot.val().time)

    setTimeout(function () {
        console.log('The ' + postKey + ' has been removed. ')
        queryRef.child(postKey).remove()
    }, 5000);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
// These registration tokens come from the client FCM SDKs.
var registrationTokens = [];


// Send a message to the devices corresponding to the provided
// registration tokens.
// admin.messaging().sendToDevice(registrationTokens, payload)
//     .then(function (response) {
//         // See the MessagingDevicesResponse reference documentation for
//         // the contents of response.
//         console.log("Successfully sent message:", response);
//     })
//     .catch(function (error) {
//         console.log("Error sending message:", error);
//     });
function writeNewPost(lat, lng, time) {
    // A post entry.
    var currentpostData = {
        lat: lat,
        lng: lng,
        time: Date.now()
    };
    var todayspostData = {
        lat: lat,
        lng: lng,
        time: Date.now() - new Date(new Date().toDateString())
    };

    // Get a key for a new Post.
    var currentPostKey = defaultDatabase.ref().child('current_check-in').push().key;
    var todayPostKey = defaultDatabase.ref().child('todays_check-in').push().key;

    var updates = {};
    updates['/current_check-in/' + currentPostKey] = currentpostData;
    updates['/todays_check-in/' + todayPostKey] = todayspostData;
    defaultDatabase.ref().update(updates)

    return currentPostKey;
}

var job = new CronJob('00 00 00 * * *', function () {
    /*
     * Runs every day
     * at 00:00:00 AM. 
     */
    // DO SOMETHING
    var queryRef = defaultDatabase.ref().child('todays_check-in')
    queryRef.remove()
}, function () {
    /* This function is executed when the job stops */
    console.log('stop.')
},
    true /* Start the job right now */
);