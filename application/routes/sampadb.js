const express = require('express');
const router = express.Router();
const db = require('../config/database');

// use async/await to due to incompatibility with mysql2 and promises
router.get('/getAllUsers', async (req, res, next) => {
    try {
        const [results, fields] = await db.query('SELECT * from users;');
        console.log(results);
        res.send(results);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred during query execution");
    }
});

router.get('/getAllPosts', (req, res, next) => {
    db.query('SELECT * from posts;')
        .then(([results, fields]) => {
            console.log(results);
            res.send(results);
        })
});

router.get('/getAllPostsP', (req, res, next) => {
    db.query('SELECT * from posts;')
        .then(([results, fields]) => {
            console.log(results);
            // to use multiple `.then`'s, a promise must be returned
            return db.query("SELECT * FROM posts WHERE id = 2")
        })
        .then(([results, fields]) => {
            console.log(results);
            res.send(results);
        })
});

router.post('/createUser', (req, res, next) => {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    // validate data; if bad send response
    // res.redirect('/registration');

    let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())';

    db.query(baseSQL, [username, email, password]).then(([results, fields]) => {
        if (results && results.affectedRows) {
            res.send("user was made");
        } else {
            res.send("user was not made successfully");
        }
    })
});

module.exports = router;