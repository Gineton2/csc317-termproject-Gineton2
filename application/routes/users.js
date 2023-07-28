var express = require('express');
var router = express.Router();

var db = require('../config/database');
const { successPrint } = require('../helpers/debug/debugprinters');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  // let passwordConfirmation = req.body.passwordConfirmation;

  /* TODO: server-side validation */

  db.execute('SELECT * FROM users WHERE email=?', [email])
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        // email is available, check if username is available
        return db.execute('SELECT * FROM users WHERE username=?', [username])
      } else {
        throw new UserError(
          "Registration Failed: Email already exists",
          "/registration",
          200
        );
      }
    })
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        // username is available
        let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())';
        return db.execute(baseSQL, [username, email, password]);
      } else {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/registration",
          200
        );
      }
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        successPrint("users.js -> User was created");
        res.redirect('/login');
      } else {
        throw new UserError(
          "Server Error. User could not be created",
          "/registration",
          500
        );
      }
    })
    .catch((err) => {
    errorPrint("user could not be created", err);
    if (err instanceof UserError) {
      errorPrint(err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
    } else {
      next(err);
    }
  });
});

module.exports = router;