var config      = require('./../config.json');
var mongodb     = require('mongodb');
var ObjectId    = require('mongodb').ObjectID;

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


var deleteItem = function deleteItem(userId, id, callback)
{
    MongoClient.connect(config.db, function(err, db) {
        if (err) throw err;

        var collection = db.collection('items');

        collection.remove(
            { _id : new ObjectId(id), userId : userId }
            , function(err, col){
                if (callback) callback(err, col);
                db.close();
            });
    });
};

var updateCategory = function updateCategory(userId, categoryId, callback) {
  console.log('updating');
  MongoClient.connect(config.db, function(err, db) {
      if (err) throw err;

      var collection = db.collection('categories');

      collection.update(
          { _id : categoryId, userId : userId }
          , { '$set': { lastUsage : new Date().toISOString() }, '$inc': { times : 1 } }
          , {upsert:true}
          , function(err, col){
            console.log(err);
              if (callback) callback(err, item);
              db.close();
          });
  });
};

var postCategory = function postCategory(item, callback)
{
    MongoClient.connect(config.db, function(err, db) {
        if (err) throw err;

        var collection = db.collection('categories');

        collection.insert(
            item
            , function(err, col){
                if (callback) callback(err, item);
                db.close();
            });
    });
};


var getCategories = function getCategories(userId, limit, skip, callback)
{
	MongoClient.connect(config.db, function(err, db) {
        if (err) throw err;

        var collection = db.collection('categories');
        var cursor = collection.find({ userId : userId }).sort({ lastUsage: -1 }).limit(limit).skip(skip);

        cursor.toArray(function(err, items){
            callback(err, items);
            db.close();
        });
    });
};


var setup = function setup(callback) {
    MongoClient.connect(config.db, function(err, db) {
        db.createCollection('items', {'capped':true, 'size':10024}, function(err, collection) {
          db.createCollection('categories', {'capped':true, 'size':2048}, function(err, collection) {
            callback(err, collection);
            db.close();
          });
      });
    });
}



//exports
var exports = module.exports = {};
    exports.getUser   = getUser;
    exports.postUser  = postUser;
    exports.getItems  = getItems;
    exports.postItem  = postItem;
    exports.deleteItem = deleteItem;
    exports.updateCategory = updateCategory;
    exports.getCategories  = getCategories;
    exports.postCategory  = postCategory;
    exports.setup     = setup;
