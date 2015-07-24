var express     = require('express');
var router      = express.Router();
var users       = require('./lib/users');
var todos       = require('./lib/todo');
var categories  = require('./lib/category');


router.post('/login', users.login);
router.post('/signup', users.signup);


module.exports = router;
