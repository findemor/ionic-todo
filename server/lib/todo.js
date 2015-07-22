var db        = require('./database');
var r         = require('./response');

var getItems = function getItems (req, res) {
  var _id = req.params._id;
  // validate incoming data
  if (!_id) {
    r._401(res); // send a 401 Error
    return;
  }

  var limit = 1000;
  var skip = 0;

  db.getItems(_id, limit, skip, function(err, items) {
    r._200(res, items);
  });
};

var postItem = function postItem (req, res) {
  var todo = req.body;
  var _id = req.params._id;

  // validate incoming data
  if (!(todo && _id)) {
    r._401(res); // send a 401 Error
    return;
  }

  var item = {
    timestamp : new Date().toISOString(),
    userId : _id,
    name : todo.name,
    category : todo.category
  }


  // Save Todo
  db.postItem(item, function(err, item) {
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
    exports.getItems   = getItems;
    exports.postItem   = postItem;
