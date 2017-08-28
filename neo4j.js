const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://13.70.155.100/', neo4j.auth.basic('neo4j', 'lilolp1122!!'));

function Query() {

  this.login = function (params, callback) {
    var session = driver.session();
    return session
      .run(
      'MATCH (u:User {username:{username},password:{password}}) RETURN u.username as username',
      params
      )
      .then(result => {
        session.close();
        callback(result.records)
      })
      .catch(error => {
        session.close();
        throw error;
      });
  }


  this.register = function (params, callback) {
    var session = driver.session();
    return session
      .run(
      'create (u:User{ \
	    username:{username}, \
	    email:{email}, \
      password:{password}}) \
      return u.username as username',
      params
      )
      .then(result => {
        session.close();
        callback(result.records)
      })
      .catch(error => {
        session.close();
        callback([])
      });
  }
}


module.exports = Query
