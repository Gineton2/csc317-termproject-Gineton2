const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '', //'hunter2',
    database: 'sampadb',
    connectionLimit: 50,
    waitForConnections: true,
    debug: false, // debug is for verbose logging
});

const promisePool = pool.promise();

module.exports = promisePool;