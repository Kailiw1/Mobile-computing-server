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
      password:{password}, \
      status : {status}}) \
      return u.username as username',
      params
      )
      .then(result => {
        session.close();
        callback(result.records)
      })
      .catch(error => {
        session.close();
        console.log(error)
        callback([])
      });
  }

  this.checkplace = function (params, callback) {
    var session = driver.session();
    return session
      .run(
      'match (u:Place{ \
	    name:{name}, \
	    lat:{lat}, \
      lng:{lng}}) \
      return u.name as name',
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
  this.checkin_newplace = function (params, callback) {
    var session = driver.session();
    return session
      .run(
      'match (u:User {username:{username}}) \
      create (u)- [c:Checkin {time:{time}}]->(p:Place{ \
	    name:{name}, \
	    lat:{lat}, \
      lng:{lng}, \
      vicinity:{vicinity}}) \
      return c.time as time',
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
  this.checkin = function (params, callback) {
    var session = driver.session();
    return session
      .run(
      'match (u:User {username:{username}}) \
      match (p:Place {name:{name},lat:{lat},lng:{lng}}) \
      create (u)- [c:Checkin {time:{time}}]->(p) \
      return c.time as time',
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

  this.checkin_current = function (params, callback) {
    var session = driver.session();
    return session
      .run(
      'match (u:User {username:{username}}) \
      create (u)- [c:Checkin {time:{time}}]->(p:Place {name:{name},lat:{lat},lng:{lng}}) \
      return c.time as time',
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

  this.update = function (params, callback) {
    var session = driver.session();
    return session
      .run(
      'match (u:User {username:{username}}) match (t)-[c:Checkin]->(p) where c.time>u.status return p.lat as lat, p.lng as lng ', //
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
  this.updatestatus = function(params,callback){
    //set u.status = {time}
    var session = driver.session();
    return session
      .run(
      'match (u:User {username:{username}}) set u.status = {time}', //
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
  this.dev = function (params, callback) {
    var session = driver.session();
    return session
      .run(
      // 'match (u:User {username:"admin"}) set u.status = {time}',
      'match (u:Place ) where ID(u)=2 \
       match (q:User {username:"admin"}) \
      create (q)-[v:CheckIn {time: {time}}]->(u)',
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
