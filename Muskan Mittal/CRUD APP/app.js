const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


const db=  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Muskan@0209",
    database: "testdb", 
});


db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQLI");
});


app.get("/create-table", (req, res) => {
        const sql =`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100)
        )
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Users table created!");
    });
});

app.post("/insert", (req, res) => {
    const { name, email}= req.body;
    const sql = "INSERT INTO users (name, email) VALUES (?,?)";
    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        res.send("Record inserted!");
    });
});


app.post("/update", (req, res) => {
    const { id, name, email } = req.body;
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    db.query(sql, [name, email, id], (err, result) => {
      if (err) throw err;
      res.send("Record updated!");
    });
  });
  
  
  app.post("/delete", (req, res) => {
    const { id } = req.body;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send("Record deleted!");
    });
  });
  
  
  app.get("/show-table", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  
  app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
  });
  