var jwt = require('jsonwebtoken');



// var secret = 'daryldaryl'
// // sign with default (HMAC SHA256)

// var token = jwt.sign({
//     data: {username:'daryl'}
// }, secret, { expiresIn: '100 days' });

// console.log(token)

// // verify a token symmetric
// jwt.verify(token, secret, function (err, decoded) {
//     if(err){
//         console.log(err.name) 
//         console.log(err.message) 
//     }else{
//         console.log(decoded) 
//     }

// });


var s = 'aa_cc'
if (/^[a-z0-9_]+$/i.test(s)) {
    console.log('success')
} else {
    console.log('failed')
}
console.log('index of space ', s.indexOf(' '))

s = s.replace(' ', '')
console.log(s)