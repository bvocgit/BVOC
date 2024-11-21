const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'asing@pqZ09', 
    database: 'data_base02'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

app.get('/create-table', (req, res) => {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
      )
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User  Table Created');
    });
});

app.post('/insert', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        res.send('User  inserted with ID: ' + result.insertId);
    });
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) throw err;
        res.send('User  updated with ID: ' + id);
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.send('User  deleted with ID: ' + id);
    });
});

app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});