var db = require('../config/database');
const postsMiddleware = {};

postsMiddleware.getRecentPosts = (req, res, next) => {
    let baseSQL = "SELECT posts.id, posts.title, posts.description, posts.thumbnail, DATE_FORMAT(posts.created, '%m/%d/%Y') AS created_formatted,  users.username FROM posts INNER JOIN users ON posts.fk_userid = users.id ORDER BY created_formatted DESC LIMIT 8";
    db.execute(baseSQL,[])
    .then(([results, fields]) => {
        res.locals.results = results; 
        if (results && results.length == 0) {
            req.flash('error', 'No posts have been created.');
        }
        next();
    })
    .catch((err) => next(err));
}

module.exports = postsMiddleware;