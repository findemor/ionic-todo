var config      = require('./../config.json');
var mongodb     = require('mongodb');
var ObjectId    = require('mongodb').ObjectID;

var connection = process.env.db || config.db;

var MongoClient = mongodb.MongoClient;

var getUser = function getUser(id, callback) {
    MongoClient.connect(connection, function(err, db) {
        if (err) throw err;

        var collection = db.collection(config.dbprefix + 'users');
        var cursor = collection.find({ _id : id });

        cursor.toArray(function(err, users){
            callback(err, users ? users[0] : null);
            db.close();
        });
    });
};

var postUser = function postUser(user, callback) {
  MongoClient.connect(connection, function(err, db) {
      if (err) throw err;

      var collection = db.collection(config.dbprefix + 'users');

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
	MongoClient.connect(connection, function(err, db) {
        if (err) throw err;

        var collection = db.collection(config.dbprefix + 'items');
        var cursor = collection.find({ userId : userId, deleted : false }).sort({ category: 1, name: 1 }).limit(limit).skip(skip);

        cursor.toArray(function(err, items){
            callback(err, items);
            db.close();
        });
    });
};

var postItem = function postItem(item, callback)
{
    MongoClient.connect(connection, function(err, db) {
        if (err) throw err;

        var collection = db.collection(config.dbprefix + 'items');

        item.deleted = false;

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
    MongoClient.connect(connection, function(err, db) {
        if (err) throw err;

        var collection = db.collection(config.dbprefix + 'items');

        collection.update(
            { _id : new ObjectId(id), userId : userId }
            , { deleted : true }
            , function(err, col){
                if (callback) callback(err, col);
                db.close();
            });
    });
};

var updateCategory = function updateCategory(userId, categoryId, callback) {
  console.log('updating');
  MongoClient.connect(connection, function(err, db) {
      if (err) throw err;

      var collection = db.collection(config.dbprefix + 'categories');

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
    MongoClient.connect(connection, function(err, db) {
        if (err) throw err;

        var collection = db.collection(config.dbprefix + 'categories');

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
	MongoClient.connect(connection, function(err, db) {
        if (err) throw err;

        var collection = db.collection(config.dbprefix + 'categories');
        var cursor = collection.find({ userId : userId }).sort({ lastUsage: -1 }).limit(limit).skip(skip);

        cursor.toArray(function(err, items){
            callback(err, items);
            db.close();
        });
    });
};


var setup = function setup(callback) {
    MongoClient.connect(connection, function(err, db) {
        db.createCollection(config.dbprefix + 'items', {'capped':true, 'size':10024}, function(err, collection) {
          db.createCollection(config.dbprefix + 'categories', {'capped':true, 'size':2048}, function(err, collection) {
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
