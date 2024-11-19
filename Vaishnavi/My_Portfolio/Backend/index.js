const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@123Diya@',
  database: 'my_portfolio'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/skills', (req, res) => {
  db.query('SELECT * FROM skills', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/project', (req, res) => {
  db.query('SELECT * FROM project', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/softskills', (req, res) => {
  db.query('SELECT * FROM softskills', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.get('/achievements', (req, res) => {
  db.query('SELECT * FROM achievements', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
