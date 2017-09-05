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

var ref = defaultDatabase.ref("check-in");
var queryRef = defaultDatabase.ref().child('current_check-in')

// Attach an asynchronous callback to read the data at our posts reference
ref.on("child_added", function (snapshot) {
    // console.log(snapshot.key)
    console.log('check-in ', snapshot.val().time)

    var postKey = writeNewPost(snapshot.val().place.lat, snapshot.val().place.lng, new Date(snapshot.val().time).getTime())

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
<<<<<<< HEAD
=======
function writeNewPost(lat, lng, time) {
    // A post entry.
    var postData = {
        lat: lat,
        lng: lng,
        time: time
    };

    // Get a key for a new Post.
    var newPostKey = defaultDatabase.ref().child('current_check-in').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/current_check-in/' + newPostKey] = postData;

    defaultDatabase.ref().update(updates)

    return newPostKey;
}
>>>>>>> 675f7426b5a88d38349d584f0370d5d1664ff2d7

