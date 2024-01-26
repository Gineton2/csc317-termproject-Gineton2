const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    multipleStatements: true,
});

const sqlFile = fs.readFileSync('config/sampadb-struc-data.sql', 'utf8');

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database successfully!');

    // Execute the SQL queries
    connection.query(sqlFile, (err, results) => {
        if (err) {
            console.error('Error executing SQL queries:', err);
        } else {
            console.log('Database setup successful!');
        }
        connection.end();
    });
});