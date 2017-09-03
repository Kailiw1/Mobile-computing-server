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

// These registration tokens come from the client FCM SDKs.
var registrationTokens = [
    "fYMcL1CB0JE:APA91bHxvaQgp4kEg75vZRZHgTuQAng3mLDH5jB7EW2-adBBB6V2Gm_algxP7sH7OKnbPhwPVqixXxNezSzAKSgd3CuJTp2M5I6pL4W4snIdup0UPPgNkudMthyvXLFfeYGxJmA5fXnM"
  ];
  
  // See the "Defining the message payload" section below for details
  // on how to define a message payload.
  var payload = {
    data: {
      score: "850",
      time: "2:45"
    }
  };
  
  // Send a message to the devices corresponding to the provided
  // registration tokens.
  admin.messaging().sendToDevice(registrationTokens, payload)
    .then(function(response) {
      // See the MessagingDevicesResponse reference documentation for
      // the contents of response.
      console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
    });