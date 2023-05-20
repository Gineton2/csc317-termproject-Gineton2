var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/imagepost', function(req, res, next) {
  res.render('imagepost');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/postimage', function(req, res, next) {
  res.render('postimage');
});

router.get('/registration', function(req, res, next) {
  res.render('registration');
});

module.exports = router;
