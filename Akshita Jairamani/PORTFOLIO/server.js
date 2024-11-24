var express = require("express");
var app = express();
var userRoute = require("./user.js");

app.set('view engine','ejs');

//app.get('/',(req,res) => {
    //res.end("Hello");
//});

app.get('/insert',(req,res) =>{
   // res.status(200);
   // res.write('akshita');
   res.render('portfolio.ejs',{
    'text':''
   })
    //res.end();
});

//app.use('/user', userRoute);
app.listen(8080);