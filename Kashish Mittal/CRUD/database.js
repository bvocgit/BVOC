const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'Kashish',
    password: 'kashish1234',
    database: 'employee_db'
})


module.exports = mysqlPool