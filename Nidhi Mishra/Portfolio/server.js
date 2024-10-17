const express = require("express");
const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", {"Name" : "Nidhi Mishra",
        "Roll":"22105073",
        "Course":"B.Voc(Web Designing)"
    });
});

app.get("/portfolio", (req, res) => {
    res.render("demo.ejs", {"name" : "Nidhi Mishra",
        "university":"Delhi University",
        "email" : "nidhimishra9402@gmail.com"
    });   
})

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
}); 