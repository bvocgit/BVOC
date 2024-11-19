const express = require("express");
const app = express();
const port = 8084;

app.set("view engine", "ejs");


app.get("/",(req,res) => {
    res.render("index.ejs",{"Name" : "Nishita",
        "Profession":"Developer",
        "Project1":"Kalindi Website",
        "Project2":"Know your world",


    });
});

app.listen(port,() => {
    console.log(`server is listening to port ${port}`);
});