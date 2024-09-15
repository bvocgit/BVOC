const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());           // For JSON requests.
app.use(express.urlencoded({ extended: true })); // For form submissions.
app.use(express.static('public')); // For static files like CSS.
app.set('view engine', 'ejs');    // Setting EJS as the view engine.

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'shreyasingh', 
  database: 'todo'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Route to render the homepage with tasks
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM tasks ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.render('index', { todoList: results });
  });
});

// Route to add a new task
app.post('/tasks', (req, res) => {
  const { task, due_date, comments, priority, category } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  const sql = 'INSERT INTO tasks (task, due_date, comments, priority, category) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [task, due_date, comments, priority, category], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/'); 
  });
});

// Route to delete a task
app.post('/tasks/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/'); 
  });
});

// Start the server
app.listen(8080, () => {
  console.log('Server started on port 8080');
});
