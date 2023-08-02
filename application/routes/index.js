var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {title:"Home"});
});

router.get('/home', function(req, res, next) {
  res.render('home', {title:"Home"});
});

router.get('/image-post', function(req, res, next) {
  res.render('image-post', {title:"Image Post"});
});

router.get('/log-in', function(req, res, next) {
  res.render('log-in', {title:"Log In"});
});

router.get('/post-image', function(req, res, next) {
  res.render('post-image', {title:"Post Image"});
});

router.get('/registration', function(req, res, next) {
  res.render('registration', {title:"Registration"});
});

module.exports = router;
