// console.log("hello")
var express = require("express");
var app = express();

app.set('view engine', 'ejs');
app.get('/insert', (req,res)=>{
    // res.write("inserted Successfully");
    res.render('first.ejs',
        {'text': ''});
    // res.end();

}

);
app.listen(8080);