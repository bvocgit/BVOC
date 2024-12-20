const express =require('express');
const app = express();
const bodyparser =require("body-parser");
const mysql =require("mysql2");
const cors = require("cors");
const { emit } = require('nodemon');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "priya",
    database: "crud_item"
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get("/api/get", (req,res) => {
    const sqlGet ="SELECT * FROM item_db";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/api/post", (req,res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = 
    "INSERT INTO item_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req,res) => {
    const {id} = req.params;
    const sqlRemove =  "DELETE FROM item_db WHERE id = ?";
    db.query(sqlRemove,[id] , (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req,res) => {
    const {id} = req.params;
    const sqlGet ="SELECT * FROM item_db where id =?";
    db.query(sqlGet,[id] , (error,result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req,res) => {
    const {id} = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate ="UPDATE item_db SET name =?, email =?, contact =? WHERE id =?";
    db.query(sqlUpdate,[name, email, contact,[id]] , (error,result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req,res)  => {
//     const sqlInsert = "INSERT INTO item_db (name, email, contact) VALUES ('DAMON' ,'DAMON@gmail.com', 5475298990)";
//     db.query(sqlInsert, (error, result) => {
//       console.log("error", error);
//       console.log("result", result);
//      res.send("hello express");
//     });
});

app.listen(8085, () => {
    console.log('server is running in port 8085');
});