const connection = require("./db");
const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const path = require("path");
const {v4:uuidv4} = require("uuid");
const methodOverride = require("method-override");

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname,"public")));
//post  method access from body
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'));


// // Function to generate random user data
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.password(),
    faker.image.avatar(),
    faker.lorem.paragraph(),
  ];
};

// Insert random data into the database
let q = "INSERT INTO user (id, username, password, image, content) VALUES ?";
let data = [];
for (let i = 1; i <= 5; i++) {
  data.push(getRandomUser());
}

connection.query(q, [data], (err, result) => {
  if (err) {
    console.error("Error inserting data:", err.message);
    return;
  }
  console.log("Data inserted:", result.affectedRows);
});

// Home route
app.get("/posts", (req, res) => {
  let q = "SELECT * FROM user";
  connection.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err.message);
      return res.status(500).send("Database query error.");
    }
    res.render("home.ejs", { data });
  });
});

//create route
app.get("/posts/new",(req,res) =>{
  res.render("new.ejs");
});

app.post("/posts",(req,res) =>{
  let{username,password,image,content}= req.body
  let q ="INSERT INTO user (id, username, password, image, content) VALUES (?)";
  let id=uuidv4();
  let user =[id,username,password,image,content];
// Database interaction
try {
  connection.query(q, [user], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error inserting data into the database.");
    }

    // Redirect to /posts after successful insertion
    res.redirect("/posts");
  });
} catch (err) {
  console.error(err);
  res.status(500).send("Server error.");
}
  
});

//show route
app.get("/posts/:id",(req,res) =>{
  let {id} =req.params;
  let q = `select * from user where id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error ");
      }
  
      // Redirect to /posts after successful insertion
      let user = result[0];
      res.render("show.ejs",{user});
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});


//edit route
app.get("/posts/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q =`select * from user where id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error");
      }
  
      let user = result[0];
      res.render("edit.ejs",{user});
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

//update route
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let {content:newcontent} = req.body;
    let q  =`update user set content ='${newcontent}' where id='${id}'`;
    try {
      connection.query(q, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error inserting data into the database.");
        }
    
        res.redirect("/posts");
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error.");
    }
});

//delete
app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let q = `delete from user where id = '${id}'`;
    try {
      connection.query(q, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error !");
        }
    
        res.redirect("/posts");
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error.");
    }
});
// Start the server
app.listen(8080, () => {
  console.log("App is working on http://localhost:8080");
});

