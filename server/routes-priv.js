var express     = require('express');
var router      = express.Router();
var users       = require('./lib/users');
var todos       = require('./lib/todo');
var categories  = require('./lib/category');
var auth        = require('./lib/auth');

router.use(auth);

router.get('/todos/:_id', todos.getItems);
router.post('/todos/:_id', todos.postItem);
router.delete('/todos/:_id/:_itemId', todos.deleteItem);

router.get('/categories/:_id', categories.getCategories);
router.post('/categories/:_id', categories.postCategory);


module.exports = router;
