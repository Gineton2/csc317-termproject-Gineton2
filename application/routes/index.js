var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {title:"Home"});
});

router.get('/home', function(req, res, next) {
  res.render('home', {title:"Home"});
});

router.get('/imagepost', function(req, res, next) {
  res.render('imagepost', {title:"Image Post"});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title:"Login"});
});

router.get('/postimage', function(req, res, next) {
  res.render('postimage', {title:"Post Image"});
});

router.get('/registration', function(req, res, next) {
  res.render('registration', {title:"Registration"});
});

module.exports = router;
