const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'akshita',
    database: 'contact_app'
});

module.exports = pool.promise();
