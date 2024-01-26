var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserModel = require('../models/Users');
const UserError = require('../helpers/error/UserError');
const {validateRegistration, returnValidationErrors, validateLogin} = require('../middleware/validation-middleware');
var bcrypt = require('bcrypt');

/* Registration */
router.post('/register', validateRegistration, returnValidationErrors, (req, res, next) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  UserModel.usernameExists(username)
    .then((usernameExists) => {
      if (usernameExists) {
        throw new UserError(
          "Registration Failed: Email already exists",
          "/registration",
          200
        );
      } else {
        return UserModel.emailExists(email);
      }
    })
    .then((emailExists) => {
      if (emailExists) {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/registration",
          200
        );
      } else {
        return UserModel.create(username, password, email);
      }
    })
    .then((createdUserId) => {
      if (createdUserId < 0) {
        throw new UserError(
          "Server Error. User could not be created",
          "/registration",
          500
        );
      } else {
        successPrint("users.js -> User was created");
        req.flash("success", 'User account was successfully created.');
        res.redirect('/log-in');
      }
    })
    .catch((err) => {
      errorPrint("User could not be created", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash("error", err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      } else {
        next(err);
      }
    });
  /* TODO: server-side validation */
});

/* Log-in */
router.post('/log-in', validateLogin, returnValidationErrors, (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in.`);
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        // console.log(req.session);

        res.cookie("Logged", username, { expires: new Date(Date.now() + 900000), httpOnly: false });
        res.cookie("isLogged", "true", { expires: new Date(Date.now() + 900000), httpOnly: false }); /* httpOnly false: accessible from frontend */

        req.flash("success", "You have successfully logged in!");
        res.redirect('/');
      } else {
        throw new UserError(
          "Invalid password",
          "/log-in",
          200
        );
      }
    })
    .catch((err) => {
      errorPrint("User log-in failed", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash("error", err.getMessage());
        res.status(err.getStatus());
        res.redirect('/log-in');
      } else {
        next(err);
      }
    });
});

/* Log-out */
router.post("/log-out", (req, res, next) => {
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