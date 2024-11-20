const mysql= require ('mysql2');
const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/show', (req,res) =>{
    con.query('select * from student', (err, results) => {
        if (err) {          
          res.send('Error showing users');
          return;
        }
        res.json(results);
      });
});

app.post('/insert',(req,res) =>{
    const { id, name } = req.body;
    con.query('insert into student (id, name) values (?, ?)', [id, name], (err, result) => {
      if (err) {
        res.send('Error inserting user');
        return;
      }
      res.send('User created successfully');
    });
});

app.post('/delete',(req,res) =>{
    const {id} = req.body;
  con.query('delete from student where id = ?', [id], (err, result) => {
    if (err) {
      res.send('Error deleting user');
      return;
    }
    res.send('User deleted successfully');
  });
});

app.post('/update',(req,res) =>{
  const {name} = req.body;
  const {id} = req.body;
  con.query('UPDATE student SET name = ? WHERE id = ?', [name, id], (err, result) => {
    if (err) {
      res.send('Error updating user');
      return;
    }
    res.send('User updated successfully');
  });
});

app.get('/',(req,res)=>{
  const _retfile = path.join(__dirname, 'index.html');
  res.sendFile(_retfile);
})

app.listen(8082);;

var con= mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "pass123sql",                       
    database:"node"
});


  

