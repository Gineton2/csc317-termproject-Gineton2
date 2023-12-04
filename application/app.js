const createError = require("http-errors");
const express = require("express");
const favicon = require('serve-favicon');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const mySQLSession = require("express-mysql-session")(session);
const flash = require("express-flash");

const handlebars = require("express-handlebars");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentRouter = require("./routes/comments")
const dbRouter = require("./routes/sampadb");
const errorPrint = require("./helpers/debug/debugprinters").errorPrint;
const requestPrint = require("./helpers/debug/debugprinters").requestPrint;
// successPrint performed in route files?
// const successPrint = require("./helpers/debug/debugprinters").successPrint;

const app = express();

app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "views/layouts"), //where to look for layouts
    partialsDir: path.join(__dirname, "views/partials"),
    extname: ".hbs", //expected file extension for handlebars files
    defaultLayout: "layout", //default layout for app, general template for all pages in app
    helpers: {
      emptyObject: (obj) => {
        return !(obj.constructor === Object && Object.keys(obj).length == 0);
      } //adding new helpers to handlebars for extra functionality
    },
  })
);

var mySQLSessionStore = new mySQLSession(
  {/* using default options */ },
  require('./config/database')
);
app.use(session({
  key: "csid",
  secret: "the matrix has you",
  store: mySQLSessionStore,
  resave: false, // resave session vars, true can cause race conditions
  saveUninitialized: false // do not save empty values in session vars
}));

app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use("/public", express.static(path.join(__dirname, "public")));

// route middleware from ./helpers/debug/debugprinters.js
app.use((req, res, next) => {
  requestPrint(req.url);
  next();
});

app.use((req, res, next) => {
  if (req.session.username) {
    res.locals.logged = true;
  }
  next();
});

app.use("/", indexRouter); // route middleware from ./routes/index.js
app.use("/users", usersRouter); // route middleware from ./routes/users.js
app.use("/sampadb", dbRouter);
app.use("/posts", postsRouter); // route middleware from ./routes/posts.js
app.use("/comments", commentRouter); // route middleware from ./routes/comments.js

/**
 * Catch all route, if we get to here then the 
 * resource requested could not be found.
 */
app.use((req, res, next) => {
  next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
})


/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  errorPrint(err);
  // render the error page
  res.status(err.status || 500);
  // res.send("Database error.")
  res.render("error");
  // res.render("error", {err_message: err});
});

module.exports = app; 
