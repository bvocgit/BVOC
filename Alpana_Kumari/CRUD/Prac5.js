//select Query

var mysql= require("mysql2");
var http = require("http");
var con = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Alpana@220118",
  database:"node"
})
http.createServer(function(req,res){
  res.writeHead(200,{"Content-Type" : "application/json"});
  con.connect(function(err){
    if(err){
      res.write("error occured!");
      res.end();
    }
    else{
      var sql = "select * from student;"
      con.query(sql,function(err,result,fields){
        if(err){
          res.write("query error!");
        }
        else{
          res.write(JSON.stringify(result));
          res.end();
        }
       
      });
    }
  })
 
}).listen(8080);