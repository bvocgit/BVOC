var mysql = require("mysql2");//npm install mysql to install module
var http=require("http");

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"application/json"});
    
    con.connect(function(err){
    if(err){
        console.log("error occured!!");
    }
    else{
        if(req.method==='GET'&& req.url==="/insert"){
            // var q=url.parse(req.url, true).query;
            // var id=q.id;
            // var name=q.name;
            // console.log(employee_no);
            // console.log(name);
            var sql ="insert into employee values(01,'ananya',123454)";
            con.query(sql,function(err,result,fields){
                if(err){
                    res.write("query error");
                }
                res.write("added successfully");
                res.end();
            });
        }
        else if(req.method==='GET'&& req.url==="/show"){
           var query2="select * from employee";
           con.query(query2,function(err,result,fields){
              if(err){
                console.log("select query error")
            }
            res.write(JSON.stringify(result));
            return res.end();
        });
    }
       else if(req.method==='GET'&& req.url==="/delete"){
        var query3="delete from employee where employee_n0=01";
        con.query(query3,function(err,result,fields){
            if(err){console.log("delete query error")}
            res.write("deleted successfully");
            res.end();
        })
    }

        else if(req.method==='GET'&& req.url==="/update"){
            var query4="update from employee set employee_n0=05 where employee_n0=01";
            con.query(query3,function(err,result,fields){
                if(err){console.log("update query error")}
                res.write("update  successfully");
                res.end();
            });
   }}
});

}).listen(8080);

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"shikha1106",
    database:"employee_db"
});
