const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

// Get a user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results[0]);
  });
});

// Create a new user
router.post('/', (req, res) => {
  const { name, email, age } = req.body;
  db.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age], (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: results.insertId, name, email, age });
  });
});

// Update a user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  db.query('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, id], (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json({ id, name, email, age });
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'User deleted successfully!' });
  });
});

module.exports = router;
