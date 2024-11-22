const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware to parse JSON data and enable CORS
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql@23",
  database: "student"
});

db.connect(err => {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

// Route to serve the index.html file by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Insert student
app.post('/addStudent', (req, res) => {
  const name = req.body.name;
  const sql = "INSERT INTO student_info (name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Student added successfully");
    }
  });
});

// Update student
app.put('/updateStudent', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const sql = "UPDATE student_info SET name = ? WHERE roll_no = ?";
  db.query(sql, [name, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Student updated successfully");
    }
  });
});

// Delete student
app.delete('/deleteStudent/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_info WHERE roll_no = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Student deleted successfully");
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
