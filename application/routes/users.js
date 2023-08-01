var express = require('express');
var router = express.Router();

var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');

const UserError = require('../helpers/error/UserError');

var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* Registration */
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
        return bcrypt.hash(password, 11);
      } else {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/registration",
          200
        );
      }
    })
    .then((hashedPassword) => {
      let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())';
      return db.execute(baseSQL, [username, email, hashedPassword]);
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

/* Login */
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  /* TODO: Server-side validation */

  let baseSQL = 'SELECT id, username, password FROM users WHERE username=?';
  let userID;
  db.execute(baseSQL, [username])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        let hashedPassword = results[0].password;
        userID = results[0].id;
        return bcrypt.compare(password, hashedPassword);
      } else {
        throw new UserError(
          "Invalid username and/or password",
          "/login",
          200
        );
      }
    })
    .then((passwordMatched) => {
      if (passwordMatched) {
        successPrint(`User ${username} is logged in.`);
        req.session.username = username;
        req.session.userID = userID;
        res.locals.logged = true;
        console.log(req.session);
        res.locals.logged = true;
        res.cookie("Logged", username, { expires: new Date(Date.now() + 900000), httpOnly: false });
        res.cookie("isLogged", "true", { expires: new Date(Date.now() + 900000), httpOnly: false }); /* httpOnly false: accessible from frontend */
        res.redirect('/');
      } else {
        throw new UserError(
          "Invalid password",
          "/login",
          200
        );
      }
    })
    .catch((err) => {
      errorPrint("user login failed", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        res.status(err.getStatus());
        res.redirect('/login');
      } else {
        next(err);
      }
    });
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint("Session could not be destroyed.");
      next(err);
    } else {
      successPrint("Session was destroyed");
      res.clearCookie("csid");
      res.json({ status: "OK", message: "user is logged out" });
    }
  })
});

module.exports = router;