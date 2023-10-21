var db = require('../config/database');
const CommentModel = {};

CommentModel.create = (comment, userId, postId) => {
    let baseSQL = 'INSERT INTO comments (`comment`, `fk_author_id`, `fk_post_id`) VALUES (?, ?, ?);';
    // notes: db.execute vs db.query. db.execute uses prepared statements, db.query does not. Prepared statements cache the query and reuse it. Since this is an insert statement, it is not reused, so db.query is fine.
    return db.query(baseSQL, [comment, userId, postId])
    .then(([results, fields]) => {
        if (results && results.affectedRows) {
            return Promise.resolve(results.insertId); // note: insertId is the id of the comment that was just (most recently) created
        } else {
            return Promise.resolve(-1);
        }
    })
    .catch((err) => Promise.reject(err));
}

CommentModel.getCommentsByPostId = (postId) => {
    let baseSQL = 'SELECT u.username, c.comment, c.created, c.id \
    FROM comments c JOIN users u on u.id = fk_author_id \
    WHERE c.fk_post_id = ? \
    ORDER BY c.created DESC;';
    return db.query(baseSQL, [postId])
    .then(([results, fields]) => {
        return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
}

module.exports = CommentModel;