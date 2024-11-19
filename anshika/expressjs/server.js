var express=require("express");
var app=express();
var port=8081;

app.set("view engine","ejs");

app.get("/insert",(req,res)=>{
   // res.write("hello");
    res.render("show.ejs",{
        "text":"its coming from backend"
    });
});
app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
});