var db = require('../config/database');
const PostModel = {};

PostModel.create = (title, description, imageUploaded, destinationOfThumbnail, fk_userId) => {
    const baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_user_id) VALUES (?, ?, ?, ?, now(), ?);';
    return db.execute(baseSQL, [title, description, imageUploaded, destinationOfThumbnail, fk_userId])
        .then(([results, fields]) => {
            return Promise.resolve(results && results.affectedRows);
        })
        .catch((err) => Promise.reject(err));
};

PostModel.search = (searchQuery) => {
    let baseSQL = `SELECT \
        p.id, p.title, p.description, p.thumbnail, p.created, u.username \
        FROM posts p \
        JOIN users u ON p.fk_user_id = u.id \
        WHERE concat_ws(' ', p.title, p.description, u.username) LIKE ?;`;
    let sqlReadySearchQuery = "%" + searchQuery + "%";
    return db.execute(baseSQL, [sqlReadySearchQuery])
    .then(([results, fields]) => {
        return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
}


PostModel.getNRecentPosts = (numPosts) => {
    // parameter must be parsed as a string
    numPostsString = numPosts.toString();
    let baseSQL =
        `SELECT p.id, p.title, p.description, p.thumbnail, p.created, \
        u.username FROM posts p INNER JOIN users u ON p.fk_user_id = u.id \
        ORDER BY p.created DESC LIMIT ?;`;
    return db.execute(baseSQL, [numPostsString])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
};

PostModel.getPostDetailsById = (postId) => {
    let baseSQL = 
    "SELECT p.id, p.title, p.description, p.photopath, p.created, \
    u.username FROM posts p INNER JOIN users u \
    ON p.fk_user_id = u.id WHERE p.id = ?;";
    return db.execute(baseSQL, [postId])
    .then(([results, fields]) => {
        return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};
module.exports = PostModel;