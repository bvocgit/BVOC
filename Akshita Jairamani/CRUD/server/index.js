const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "akshita",
    database: "crud_content"
})

app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req,res) => {
    const sqlGet = "select * from contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
})
app.post("/api/post", (req,res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = 
    "insert into contact_db (name, email, contact) values(?,?,?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})

app.delete("/api/remove/:id", (req,res) => {
    const { id } = req.params;
    const sqlRemove = 
    "delete from contact_db where id = ?";
    db.query(sqlRemove, id , (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req,res) => {
    const { id } = req.params;
    const sqlGet = "select * from contact_db where id=?";
    db.query(sqlGet, id , (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
})

app.put("/api/update/:id", (req,res) => {
    const { id } = req.params;
    const {name, email, contact} = req.body
    const sqlUpdate = "update contact_db set name = ?, email = ?, contact = ? where id = ?";
    db.query(sqlUpdate, [name, email, contact, id] , (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
})

app.get("/", (req,res) => {
    //const sqlInsert = "insert into contact_db (name, email, contact) values('johndoe', 'jhondoe@gmail.com', 98756789)";
    //db.query(sqlInsert, (error, result ) => {
        //console.log("error", error);
        //console.log("result", result);
        //res.send("hello express");
   // });
    
})

app.listen(5000, () => {
    console.log("server is running on port 5000");
});
