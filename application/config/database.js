const mysql = require('mysql2');
const {db} = require('./dbconfig');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    connectionLimit: 50,
    waitForConnections: true,
    debug: false, // debug is for verbose logging
});

const promisePool = pool.promise();

module.exports = promisePool;