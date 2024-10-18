var express = require('express');
var app = express();
var mysql = require('mysql2');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'garvi@15',
  database: 'Student_db'
});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Middleware to serve static files and parse JSON
app.use(express.static('public'));
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Route to insert a new student
app.post('/insert', (req, res) => {
  const { roll_no, name, course } = req.body;
  const insertQuery = 'INSERT INTO student (roll_no, name, course) VALUES (?, ?, ?)';

  con.query(insertQuery, [roll_no, name, course], (err, result) => {
    if (err) {
      console.error('Error inserting student:', err);
      res.status(500).json({ error: 'Error inserting student' });
      return;
    }
    res.json({ message: 'Student inserted successfully', result });
  });
});

// Route to show all students
app.get('/show', (req, res) => {
  const selectQuery = 'SELECT * FROM student';

  con.query(selectQuery, (err, result) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ error: 'Error fetching students' });
      return;
    }
    res.json(result);
  });
});

// Route to delete a student
app.post('/delete', (req, res) => {
  const { roll_no } = req.body;  // Assuming roll_no is the unique identifier for deletion
  const deleteQuery = 'DELETE FROM student WHERE roll_no = ?';

  con.query(deleteQuery, [roll_no], (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
      res.status(500).json({ error: 'Error deleting student' });
      return;
    }
    res.json({ message: 'Student deleted successfully', result });
  });
});

// Route to update a student's details
app.post('/update', (req, res) => {
  const { roll_no, name, course } = req.body;
  const updateQuery = 'UPDATE student SET name = ?, course = ? WHERE roll_no = ?';

  con.query(updateQuery, [name, course, roll_no], (err, result) => {
    if (err) {
      console.error('Error updating student:', err);
      res.status(500).json({ error: 'Error updating student' });
      return;
    }
    res.json({ message: 'Student updated successfully', result });
  });
});

// Start the server
app.listen(8064, () => {
  console.log('Server is running on http://localhost:8064/');
});