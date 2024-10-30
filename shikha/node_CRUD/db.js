const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_db',
  password: 'shikha1106',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;