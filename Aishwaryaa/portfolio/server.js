//console.log("hello");
const path=require('path');
var express = require("express");
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.get('/',(req,res)=>{
  //res.write("Inserted!!");
  res.render('index',{
  })
  //res.end();
})
app.listen(8054);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

