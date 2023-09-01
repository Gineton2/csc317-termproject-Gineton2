var db = require('../config/database');
const postsMiddleware = {};

postsMiddleware.getRecentPosts = (req, res, next) => {
    let baseSQL = 
        "SELECT p.id, p.title, p.description, p.thumbnail, \
        DATE_FORMAT(p.created, '%m/%d/%Y') AS created_formatted, \
        u.username FROM posts p INNER JOIN users u ON p.fk_userid = u.id \
        ORDER BY created_formatted DESC LIMIT 8";
    db.execute(baseSQL, [])
        .then(([results, fields]) => {
            res.locals.results = results;
            if (results && results.length == 0) {
                req.flash('error', 'No posts have been created.');
            }
            next();
        })
        .catch((err) => next(err));
};

// :id is a route parameter, note anything may be accepted as a parameter, so we use regex to limit it to only numbers
postsMiddleware.getPostDetails = (req, res, next) => {
    let baseSQL = 
        "SELECT p.id, p.title, p.description, p.photopath, DATE_FORMAT(p.created, '%m/%d/%Y') AS created_formatted, \
        u.username FROM posts p INNER JOIN users u \
        ON p.fk_userid = u.id WHERE p.id = ?";
    let postId = req.params.id;
    db.execute(baseSQL, [postId]).
        then(([results, fields]) => {
            res.locals.results = results;
            post = results[0];
            if (results && results.length) {
                results[0].photopath = '/' + results[0].photopath; // add leading slash to photopath; database does not store leading slash
                res.render('post-details', { currentPost: post });
            } else {
                req.flash('error', "Post not found!");
                res.redirect('/');
            }
        })
        .catch((err) => next(err));
};

module.exports = postsMiddleware;