var config      = require('./../config.json');
var mongodb     = require('mongodb');

var MongoClient = mongodb.MongoClient;

var getUser = function getUser(id, callback) {
    MongoClient.connect(config.db, function(err, db) {
        if (err) throw err;

        var collection = db.collection('users');
        var cursor = collection.find({ _id : id });

        cursor.toArray(function(err, users){
            callback(err, users ? users[0] : null);
            db.close();
        });
    });
};

var postUser = function postUser(user, callback) {
  MongoClient.connect(config.db, function(err, db) {
      if (err) throw err;

      var collection = db.collection('users');

      collection.insert(
          user
          , function(err, col){
              if (callback) callback(err, user);
              db.close();
          });
  });
};

var getItems = function getItems(userId, limit, skip, callback)
{
	MongoClient.connect(config.db, function(err, db) {
        if (err) throw err;

        var collection = db.collection('items');
        var cursor = collection.find({ userId : userId }).sort({ category: 1, name: 1 }).limit(limit).skip(skip);

        cursor.toArray(function(err, items){
            callback(err, items);
            db.close();
        });
    });
};

var postItem = function postItem(item, callback)
{
    MongoClient.connect(config.db, function(err, db) {
        if (err) throw err;

        var collection = db.collection('items');

        collection.insert(
            item
            , function(err, col){
                if (callback) callback(err, item);
                db.close();
            });
    });
};


var setup = function setup(callback) {
    MongoClient.connect(config.db, function(err, db) {
        db.createCollection('items', {'capped':true, 'size':10024}, function(err, collection) {
          callback(err, collection);
          db.close();
      });
    });
}



//exports
var exports = module.exports = {};
    exports.getUser   = getUser;
    exports.postUser  = postUser;
    exports.getItems  = getItems;
    exports.postItem  = postItem;
    exports.setup     = setup;
