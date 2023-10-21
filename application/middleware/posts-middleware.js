const {getNRecentPosts, getPostDetailsById} = require('../models/Posts');
const PostModel = require('../models/Posts');
const db = require('../config/database');
const {getCommentsByPostId} = require('../models/Comments');
const postsMiddleware = {};


postsMiddleware.getRecentPosts = async function(req, res, next) {
    try {
        let results = await getNRecentPosts(8);
        res.locals.results = results;
        if (results.length == 0) {
            req.flash('error', 'No posts have been created.');
        }
        next();
    } catch(err) {
        next(err);
    }
}


// :id is a route parameter, note anything may be accepted as a parameter, so we use regex to limit it to only numbers
postsMiddleware.getPostDetailsById = async function(req, res, next) {
    try {
        let postId = req.params.id;
        let results = await getPostDetailsById(postId);
        if (results && results.length) {
            results[0].photopath = '/' + results[0].photopath; // add leading slash to photopath; database does not store leading slash
            res.locals.currentPost = results[0];
            next();
        } else {
            req.flash('error', "Post not found!");
            res.redirect('/');
        }
    } catch (error) {
        next(err);
    }
};

postsMiddleware.getCommentsByPostId = async function(req, res, next) {
    let postId = req.params.id;
    try {
        let results = await getCommentsByPostId(postId);
        res.locals.currentPost.comments = results;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = postsMiddleware;