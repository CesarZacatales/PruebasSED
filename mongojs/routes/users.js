var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('workshopdb', ['users']);

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.users.find({}, function(err, users) {
    if (err || !users)
        res.send('Error retrieving users.');
    else
        res.render('users', {
            title: 'List of registered users:',
            users: users
        });
  });

});

module.exports = router;
