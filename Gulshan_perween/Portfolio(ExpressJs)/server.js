var express = require("express");

var app = express();
app.use (express.static('public'));
app.set('view engine', 'ejs');

app.get('/insert',function(req,res){
    res.render('a.ejs', {"text": "hello from server"});
})
app.listen(8000);