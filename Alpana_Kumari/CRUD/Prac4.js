//insert query

var mysql= require("mysql2");
var con = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Alpana@220118",
  database:"node"
})
con.connect(function(err){
  if(err){
    console.log("error occured!");
  }
  else{
    var sql = "insert into student values(01,'alpana');"
    con.query(sql,function(err,result,fields){
      if(err){
        console.log("query error!");
      }
    })
  }
})