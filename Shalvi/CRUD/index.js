const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Setup DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'shalvi',
  password: 'Tupun',
  database: 'crud_app'
});

// Connect to DB
db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  db.query('SELECT * FROM items', (err, rows) => {
    if (err) throw err;
    res.render('index', { items: rows });
  });
});

app.post('/add', (req, res) => {
  const { name, description } = req.body;
  db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
