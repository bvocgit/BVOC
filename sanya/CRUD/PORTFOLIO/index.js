const express = require('express');
const app = express();
const path = require("path");
app.set("views", path.join(__dirname,"views"));

app.get("/",(req,res) => {
    res.render("index.ejs",{'text': ""}
);
});

app.listen(8081);