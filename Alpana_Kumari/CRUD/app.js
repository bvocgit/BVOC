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

      //insert query
      
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

      //select query

      else if(req.method === 'GET' && req.url === "/show"){
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

      //delete query

      else if(req.method === 'GET' && req.url === "/delete"){
        var sql = "delete from student where roll='2';"
        con.query(sql,function(err,result,fields){
          if(err){
            res.write("query error!");
          }
          else{
            res.write("Deleted Successfully");
            res.end();
          }
         
        });
      }

      //update query
      
      else if(req.method === 'GET' && req.url === "/update"){
        var sql = "Update student set Roll='3' where Roll='1';"
        con.query(sql,function(err,result,fields){
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
 
}).listen(8054);