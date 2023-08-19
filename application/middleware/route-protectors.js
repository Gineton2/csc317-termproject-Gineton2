const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");

const routeProtectors = {};

routeProtectors.userIsLoggedIn = function (req, res, next) {
    if (req.session.username) {
        successPrint("User is logged in.");
        next();
    } else {
        errorPrint("User is not logged in.");
        req.flash("error", "You must be logged in to create a post.");
        res.redirect("/log-in");
    }
}

routeProtectors.userIsNotLoggedIn = function (req, res, next) {
    if (!req.session.username) {
        successPrint("User is not logged in.");
        next();
    } else {
        errorPrint("User is logged in.");
        req.flash("error", "You have already registered and logged in.");
        res.redirect("/");
    }
}


module.exports = routeProtectors;