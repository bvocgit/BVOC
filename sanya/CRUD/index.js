var mysql= require ('mysql2');
const fs= require('fs');
var ejs= require('ejs');
const express = require('express');
const app= express();

app.use(express.urlencoded({extended:false}));

app.get('/', (req,res) =>{
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

app.delete('/user/:id',(req,res) =>{
    const userId = req.params.id;
  con.query('delete from student where id = ?', [userId], (err, result) => {
    if (err) {
      res.send('Error deleting user');
      return;
    }
    res.send('User deleted successfully');
  });
});

app.get('/user/update/:id',(req,res) =>{
    const { name} = req.body;
  const userId = req.params.id;
  con.query('UPDATE users SET name = ? WHERE id = ?', [name, userId], (err, result) => {
    if (err) {
      res.send('Error updating user');
      return;
    }
    res.send('User updated successfully');
  });
});

app.listen(8081);;

var con= mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "pass123sql",                       
    database:"node"
});


  

