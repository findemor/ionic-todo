var db        = require('./database');
var r         = require('./response');

var getCategories = function getCategories (req, res) {
  var _id = req.params._id;
  // validate incoming data
  if (!_id) {
    r._401(res); // send a 401 Error
    return;
  }

  var limit = 1000;
  var skip = 0;

  db.getCategories(_id, limit, skip, function(err, items) {
    r._200(res, items);
  });
};


var postCategory = function postCategory (req, res) {
  var cat = req.body;
  var _id = req.params._id;

  // validate incoming data
  if (!(cat && _id)) {
    r._401(res); // send a 401 Error
    return;
  }

  var item = {
    timestamp : new Date().toISOString(),
    lastUsage : new Date().toISOString(),
    userId : _id,
    _id : cat._id,
    times : 1
  }


  // Save Todo
  db.postCategory(item, function(err, item) {
    if (err) {
      r._401(res); // send a 401 Error
      return;
    } else {
      r._200(res, item); // send the saved Todo object with a 200 response
    }
  });

};

//exports
var exports = module.exports = {};
    exports.getCategories   = getCategories;
    exports.postCategory   = postCategory;
