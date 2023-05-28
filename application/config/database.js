const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'hunter2',
    database: 'sampadb',
    // debug is for verbose logging
    // debug: true
});

const promisePool = pool.promise();

module.exports = promisePool;