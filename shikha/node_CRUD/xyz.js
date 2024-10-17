var fs = require("fs");//to read file
var url = require('url');
var http= require("http");
http.createServer(function(req,res){
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
    // if(q.pathname == '/index'){
    // file.readFile('index.html', function(err,data){
    //     res.writeHead(404, {'Content-Type': 'text/html'});
    //     res.write(data);
    //     return res.end();
    // })}
    // else {
    //     file.readFile('index2.html', function(err,data){
    //         res.writeHead(404, {'Content-Type': 'text/html'});
    //         res.write(data);
    //         return res.end();
    //      }) }

         
   
}
).listen(8082);

