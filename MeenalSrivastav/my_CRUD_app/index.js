const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'meenal',
    password: '$ymb0l1c#P@ssw0rd',
    database: 'my_crud_db'
});

// API routes
// Create (POST)
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User created successfully' });
    });
});

// Read (GET) - Example: Get all users
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update (PUT)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User updated successfully' });
    });
});

// Delete (DELETE)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});