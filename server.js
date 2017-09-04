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

// Attach an asynchronous callback to read the data at our posts reference
ref.on("child_added", function (snapshot) {
    console.log(snapshot.key)
    // console.log(snapshot.val());
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