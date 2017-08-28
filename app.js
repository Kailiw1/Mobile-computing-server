var db = require('./neo4j.js')
var dbop = new db()


var user = {
  username: 'admin',
  password: 'lilolp',
  // email: 'grantward@hotmail.com'
}

/**
 * login 
 */
dbop.login(user, function (records) {
  console.log(records)
  if (!records.length)
    console.log('0 result')

  records.forEach(function (record) {
    console.log(record);
  });
})

/**
 * get Questions
 */
// dbop.getQuestions({ page: 1 }, function (records) {
//     // console.log(records)

//     var questionArray = []
//     records.forEach(function (record) {
//         questionArray.push({
//             title: record.get('title'),
//             answers: record.get('answers'),
//             votes: record.get('votes'),
//             tags: record.get('tags'),
//             time: new Date(parseInt(record.get('time'))).toLocaleString()
//         })
//     }, this);
//     console.log(questionArray)
// })

/**
 * questionDetail
 */

// dbop.questionDetail({ qid: parseInt(53) }, function (records) {
//     // console.log(records)
//     var record = records[0]
//     var question = {
//             title: record.get('title'),
//             answers: record.get('answers'),
//             content: record.get('content'),
//             votes: record.get('votes'),
//             tags: record.get('tags'),
//             time: new Date(parseInt(record.get('time'))).toLocaleString()
//         }
//     console.log(question)
// })

/**
 * new question
 */
// dbop.newQuestion(question, function (records) {
//     if (!records.length)
//         console.log('username exists')
//     else
//         console.log(records);
// })



// match (u:User{username:'admin'})
// match (a:Answer) where ID(a)=61
// create (u)-[r:VoteUp]->(a)
// set a.vote=a.vote+1

