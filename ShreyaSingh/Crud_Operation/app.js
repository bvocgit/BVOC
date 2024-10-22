const express = require('express');
const mysql = require('mysql2');
const app = express();

// Middleware
app.use(express.json()); // For JSON requests
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(express.static('public')); // For static files like CSS
app.set('view engine', 'ejs'); // Setting EJS as the view engine

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shreyasingh',
  database: 'tododb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});


app.get('/', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.render('index', { todoList: results });
  });
});


app.post('/tasks', (req, res) => {
  const { task, comments, priority, due_date, category } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  const sql = 'INSERT INTO tasks (task, comments, priority, due_date, category, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [task, comments, priority, due_date, category, 'pending'], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/');
  });
});


app.post('/tasks/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/');
  });
});


app.post('/tasks/complete/:id', (req, res) => {
  const sql = 'UPDATE tasks SET status = ? WHERE id = ?';
  db.query(sql, ['completed', req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/');
  });
});


app.listen(8081, () => {
  console.log('Server started on port 8081');
});
