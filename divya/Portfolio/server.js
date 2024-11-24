var express = require("express");
var app = express();
var path = require("path");

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res) => {
    // res.write(" inserted Successfully");
    // res.render('first.ejs', {
    //     'text': 'It is coming from backend'
    // });
    res.render('divya.ejs', {
        'text': "",
        'kalindi_project': "https://github.com/Kulanshu-sharma/Kalindi",
        'linkedIn' : "https://www.linkedin.com/in/divya-gupta-9262b82a2",
        'GitHub' : "https://github.com/DivyaGupta04",
        'DockerHub' : "https://hub.docker.com/u/itsmedivya0405"
    });
    // res.end();
});

app.listen(8080);


