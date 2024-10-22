var mysql = require("mysql2");
var http = require("http");
var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "gulshan",
    database : "node"
})
http.createServer(function(req, res){
    con.connect(function(err){
        if (err){
            res.write("error found");
        }
    
        else{
            var sql = "insert into student values(1,'Gulshan')";
            // var sql2 = "select * from  student";
            con.query(sql, function(err,result,fields){
                if(err){
                    res.write("query error");
                    res.end();
                }
                else{
                    res.write(result);
                    res.end();
                }
            })
        }
    })
    res.end();
}).listen(8081);





