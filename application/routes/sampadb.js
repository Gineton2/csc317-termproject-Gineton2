const express = require('express');
const router = express.Router();
const db = require('../config/database');

// router.get('/getAllUsers', (req, res, next) => {
//     db.query('SELECT * from users;', (err, results, fields) => {
//         console.log(results);
//         res.send(results);
//     });
// });
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

module.exports = router;