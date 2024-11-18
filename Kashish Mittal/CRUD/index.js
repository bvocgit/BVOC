const express =require("express")
const app =express()
const user = require("./database");

app.set("view engine", "ejs")
app.get("/",(req,res)=>{
    res.render("index",{
        title:"this is index page",
        text:"this is home page",

    })

})



app.listen(5000,()=>{
    console.log("server listening on port :5000")
})