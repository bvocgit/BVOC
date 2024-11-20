//console.log("hello");
const path=require('path');
var express = require("express");
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.get('/',(req,res)=>{
  //res.write("Inserted!!");
  res.render('index',{
    'text':'It is coming from beckend',
    'Amazon':'https://github.com/Alpana-clg/Amazon-Clone',
    'KYW':'https://alpana-clg.github.io/KNOW-YOUR-WORLD/',
    'TTT':'https://alpana-clg.github.io/TIC-TAC-TOE/TIC-TAC-TOE/INDEX.HTML',
    'TO_DO_LIST':'https://github.com/Alpana-clg/todo-app'
  })
  //res.end();
})
app.listen(8054);
