var auth      = require('basic-auth');
var r         = require('./response');
var db        = require('./database');
var users     = require('./users');

var authorize = function (req, res, next) {
  var credentials = auth(req);

  if (req.method == "OPTIONS") {
    return next();
  }

  if (!credentials) {
    r._401(res);
  } else {
    // validate user
    db.getUser(credentials.name, function(err, u) {
      if (err || !u || u.password != users.encrypt(credentials.pass)) {
        r._401(res); // send a 401 Error
      } else {
        return next();
      }
    });
  }
};

module.exports = authorize;
