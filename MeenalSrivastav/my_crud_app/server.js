const express =  require('express')
const app = express()
const dotenv = require("dotenv")
var bodyParser = require("body-parser")
const connection = require("./config/db")
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));






app.get("/", (req, res) => {
    res.redirect("/create.html");
  });

//read operation which will be passing value to ejs engine
app.get("/data", (req, res) => {
    const allData = "select * from student_info";
    connection.query(allData, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        // res.json({ rows });
        res.render("read.ejs", { rows });  // redering read.ejs file along with data
      }
    });
  });
//create
app.post("/create", (req, res) => {   
    console.log(req.body.name);
    var name = req.body.name;
    var email = req.body.email;
    try {
      connection.query(
        "INSERT into demo123 (name,email) values(?,?)",  //2. saving in database
        [name, email],
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            // res.json({ result });
            res.redirect("/data");  //3. Redirect user to the new page
          }
        }
      );
    } catch (err) {
      res.send(err);
    }
  });

app.listen(process.env.PORT || 4000, function(error) {
    if (error) throw error;
    console.log(`server running on port ${process.env.PORT}`);
});