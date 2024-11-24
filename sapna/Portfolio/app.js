const express = require("express");
const app = express();

app.set("view engine", "ejs");


app.get("/",(req,res) => {
    res.render("index.ejs",{"Name" : "Sapna Morya",
        "Profession":"Fullstack-Developer",
        "Education":"Kalindi College,University Of Delhi",
        "Project1":"Educational Website",
        "Project2":"OEP",
    });
});

app.listen(4000,() => {
    console.log(`server is listening to port `);
});