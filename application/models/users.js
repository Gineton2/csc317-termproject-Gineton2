var db = require("../config/database");
var bcrypt = require('bcrypt');
const UserModel = {};

UserModel.create = (username, password, email) => {
    return bcrypt.hash(password, 11)
        .then((hashedPassword) => {
            let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())';
            return db.execute(baseSQL, [username, email, hashedPassword]);
        })
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                return Promise.resolve(results.insertId);
            } else {
                // user was not created
                return Promise.results(-1);
            }
        })
        .catch((err) => Promise.reject(err));
}

UserModel.usernameExists = (username) => {
    return db.execute('SELECT * FROM users WHERE username=?', [username])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length == 0));
        })
        .catch((err) => Promise.reject(err)); // notes: unbracketed single-line fat-arrow does not need return keyword
}

UserModel.emailExists = (email) => {
    return db.execute('SELECT * FROM users WHERE email=?', [email])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length == 0));
        })
        .catch((err) => Promise.reject(err));
}

UserModel.authenticate = (username, password) => {
    let baseSQL = 'SELECT id, username, password FROM users WHERE username=?';
    let userId;
    return db.execute(baseSQL, [username])
        .then(([results, fields]) => {
            if (results && results.length == 1) {
                let hashedPassword = results[0].password;
                userId = results[0].id;
                return bcrypt.compare(password, hashedPassword);
            } else {
                // this error handling is specific to the db implementation
                return Promise.reject(-1);
            }
        })
        .then((passwordsMatched) => {
            if (passwordsMatched) {
                return Promise.resolve(userId);
            } else {
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
}

module.exports = UserModel;