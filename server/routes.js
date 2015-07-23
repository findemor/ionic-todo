var express     = require('express');
var router      = express.Router();
var users       = require('./lib/users');
var todos       = require('./lib/todo');
var categories  = require('./lib/category');


router.post('/api/auth/login', users.login);
router.post('/api/auth/signup', users.signup);

router.get('/api/todos/:_id', todos.getItems);
router.post('/api/todos/:_id', todos.postItem);
router.delete('/api/todos/:_id/:_itemId', todos.deleteItem);

router.get('/api/categories/:_id', categories.getCategories);
router.post('/api/categories/:_id', categories.postCategory);


module.exports = router;
