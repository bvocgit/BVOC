var mysql= require("mysql2");
var http = require("http");
var con = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"gulshan",
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
      if(req.method === 'GET' && req.url === "/insert"){
        var sql = "insert into student values(2,'abc');"
          con.query(sql,function(err,result,fields){
            if(err){
              res.write("query error!");
            }
            else{
              res.write("Added Sccessfully!!!");
              res.end();
            }
           
          });
      }
      else if(req.method === 'GET' && req.url === "/show"){
      var sql2 = "select * from student;"
      con.query(sql2,function(err,result,fields){
        if(err){
          res.write("query error!");
        }
        else{
          res.write(JSON.stringify(result));
          res.end();
        }
       
      });
      }
      else if(req.method === 'GET' && req.url === "/delete"){
        var sql3 = "delete from student where id='2';"
        con.query(sql3,function(err,result,fields){
          if(err){
            res.write("query error!");
          }
          else{
            res.write("Deleted Successfully");
            res.end();
          }
         
        });
      }
      else if(req.method === 'GET' && req.url === "/update"){
        var sql4 = "Update student set id='2' where id='1';"
        con.query(sql4,function(err,result,fields){
          if(err){
            res.write("query error!");
          }
          else{
            res.write("Updated Successfully!!!");
            res.end();
          }
         
        });
      }
    }
  });
 
}).listen(8081);