var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/route-protectors').userIsLoggedIn;
var isNotLoggedIn = require('../middleware/route-protectors').userIsNotLoggedIn;

var getRecentPosts = require('../middleware/posts-middleware').getRecentPosts;

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('home', {title:"Home"});
});

router.get('/home', function(req, res, next) {
  res.render('home', {title:"Home"});
});

router.get('/post-details', function(req, res, next) {
  res.render('post-details', {title:"Post Details"});
});

router.get('/log-in', function(req, res, next) {
  res.render('log-in', {title:"Log In"});
});

router.use('/post-image', isLoggedIn);
router.get('/post-image', function(req, res, next) {
  res.render('post-image', {title:"Post Image"});
});

router.use('/registration', isNotLoggedIn);
router.get('/registration', function(req, res, next) {
  res.render('registration', {title:"Registration"});
});

module.exports = router;
