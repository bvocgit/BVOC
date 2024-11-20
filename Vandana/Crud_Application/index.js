const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb", // Change to your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Route to create a table
app.get("/create-table", (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      price DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(sql, (err) => {
    if (err) throw err;
    res.send("Table created successfully!");
  });
});

// Route to insert data
app.post("/insert", (req, res) => {
  const { name, price } = req.body;
  const sql = "INSERT INTO items (name, price) VALUES (?, ?)";
  db.query(sql, [name, price], (err) => {
    if (err) throw err;
    res.send("Record inserted successfully!");
  });
});

// Route to update data
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const sql = "UPDATE items SET name = ?, price = ? WHERE id = ?";
  db.query(sql, [name, price, id], (err) => {
    if (err) throw err;
    res.send("Record updated successfully!");
  });
});

// Route to delete data
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM items WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) throw err;
    res.send("Record deleted successfully!");
  });
});

// Route to show all records
app.get("/show-table", (req, res) => {
  const sql = "SELECT * FROM items";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});