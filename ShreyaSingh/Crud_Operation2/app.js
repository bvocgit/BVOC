const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());      
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 
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


app.get('/', (req, res) => {
  const sql = 'SELECT * FROM tasks ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.render('index', { todoList: results });
  });
});


app.post('/tasks', (req, res) => {
  const { task} = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  const sql = 'INSERT INTO tasks (task) VALUES (?)';
  db.query(sql, [task], (err) => {
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

app.listen(8082, () => {
  console.log('Server started on port 8082');
});
