//url module

var http = require('http');
var file = require('fs');
var url = require('url');
http.createServer(function (req, res) {
  var q = url.parse(req.url,true);
  if(q.pathname=="/hello"){
    file.readFile('index.html', function(err, data) {
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.write(data);
         return res.end();
       });
  }
  else{
    file.readFile('index2.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
    });
  }
  //
}).listen(8080);
