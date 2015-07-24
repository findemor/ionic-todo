var db        = require('./database');
var r         = require('./response');

var login = function login (req, res) {
  var user = req.body;

  // validate incoming data
  if (!(user && user._id && user.password))  {
    r._401(res); // send a 401 Error
    return;
  }

  // validate user
  db.getUser(user._id, function(err, u) {
    if (err || !u || u.password != encrypt(user.password)) {
      r._401(res); // send a 401 Error
      return;
    } else {
      u.password = null;
      r._200(res, u); // send the saved user object with a 200 response
    }
  });
};

var signup = function signup (req, res) {
  var user = req.body;

  // validate incoming data
  if (!(user && user._id && user.password)) {
    r._401(res); // send a 401 Error
    return;
  }

  // Save user
  user.timestamp  = new Date().toISOString();
  user.password   = encrypt(user.password);

  db.postUser(user, function(err, u) {
    if (err) {
      r._401(res); // send a 401 Error
      return;
    } else {
      user.password = null;
      r._200(res, user); // send the user object with a 200 response
    }
  });
};

var encrypt = function encrypt(pwd){
  var crypto = require('crypto');
  var hash = crypto.createHash('sha256').update(pwd).digest('base64');
  return hash;
}


//exports
var exports = module.exports = {};
    exports.login   = login;
    exports.signup  = signup;
    exports.encrypt = encrypt;
