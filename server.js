var CronJob = require('cron').CronJob;
var jwt = require('jsonwebtoken');

var job = new CronJob('00 00 00 * * *', function () {
    /*
     * Runs every day
     * at 00:00:00 AM. 
     */
    // DO SOMETHING

}, function () {
    /* This function is executed when the job stops */
    console.log('stop.')
},
    true /* Start the job right now */
);


var secret = 'daryldaryl'
// sign with default (HMAC SHA256)



console.log(token)

// verify a token symmetric
jwt.verify(token, secret, function (err, decoded) {
    if(err){

    }else{
        console.log(decoded) // bar
    }
   
});