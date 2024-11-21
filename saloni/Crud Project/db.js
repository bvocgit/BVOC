var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql@23",
  database: "student"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

//creating database
//   con.query("CREATE DATABASE employee", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
// });

//creating table

// var sql = "CREATE TABLE student_info (name VARCHAR(30), roll_no int AUTO_INCREMENT primary key)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });

  //insert value to table

  //var sql = "INSERT INTO student_info (name, roll_no) VALUES ('saloni',1)";

  //multiple records
  var sql = "INSERT INTO student_info (name, roll_no) VALUES ?";
  var values = [
    ['shanu',2],
    ['shreya',3],
    ['tanu',4]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    //console.log("1 record inserted");
  });


});