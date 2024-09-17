const express = require("express");
const database = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5013, () => {
   console.log("listening...");
});

//making the db connection
const db = database.createConnection({
   host: "localhost",
   user: "root",
   password: "kavita123",
   database: "crud",
});

//checking the db connection
db.connect((err)=>{
   if(err){
     console.error("Error connecting to database");
     return ;
   }
   else{
      console.log("db connection succesful");
   }
})

// API for getting all the data
app.get("/", (req, res) => {
   const select_query = "SELECT * FROM student";
   db.query(select_query, (err, result) => {
      if (err) {
         console.log("query failed", err);
         res.status(500).send("An error occurred while fetching data.");
      } else {
         console.log(result);
         res.json(result);
      }
   });
});

// API for inserting the data
app.post("/Insert", (req, res) => {
   console.log("insert api call sucessful");
   let Id = req.body.Id;
   let Name = req.body.Name;
   let Department = req.body.Department;

   const insert_query = "INSERT INTO student (Id, Name, Department) VALUES (?, ?, ?)";

   db.query(insert_query, [Id, Name, Department], (err, result) => {
      if (err) {
         console.log("Insert query failed", err);
         res.status(500).send("An error occurred while inserting data.");
      } else {
         console.log(result);
         res.json(result);
      }
   });
});

// Api for Deleting the data
app.delete("/Delete",(req,res)=>{
   let Id = req.query.Id;
   const delete_query = "delete from student where Id=(?);";
   db.query(delete_query,[Id],(err,result)=>{
      if(err){
         console.log("Delete query failed");
         res.status(500).send("An error ocuured while deleting the data");
      }
      else{
         console.log(result);
         res.json(result);
      }
   })
})

// Api for Updating the data
app.put("/Update",(req,res)=>{
   let Id = req.body.Id;
   let Name = req.body.Name;
   let Department = req.body.Department;
   const update_query = "update student set Name=(?),Department=(?) where Id=(?);";
   db.query(update_query,[Name,Department,Id],(err,result)=>{
      if(err){
         console.log("Update Query Failed");
         res.status(500).send("An error ocuured while updating the data");
      }
      else{
         console.log(result);
         res.json(result);
      }
   })

})