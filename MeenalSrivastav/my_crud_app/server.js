const express =  require('express')
const app = express()
const dotenv = require("dotenv")
var bodyParser = require("body-parser")
dotenv.config();
const connection = require("./config/db")
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.get("/", (req, res) => {
    res.redirect("/create.html");
  });

  app.post("/create",(req,res) =>{
    const name = req.body.name;
    const email = req.body.email;

    try{
        connection.query(
            "insert into student_info (name, email) values(?,?)",
            [name, email],
            (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(rows);
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
  });
  
app.listen(process.env.PORT || 4000, (error) => {
    if (error) throw error;
    console.log(`server running on port ${process.env.PORT}`);
});