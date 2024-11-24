const express = require('express');
require("dotenv").config();
const app = express();
const path = require('path');
const userController= require('./Controller/userController')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.post('/send-email',userController.sendMail);


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/projects', function (req, res) {
    const githubLink = 'https://github.com/anuucodes';
    const backened_project='https://github.com/anuucodes/BackenedProject';
    const hexcolor_code='https://github.com/anuucodes/Color-code-generator';
    res.render('project',{githubLink , backened_project, hexcolor_code});
});


app.get('/connect', function (req, res) {
    const instagram_link='https://www.instagram.com/who_anuu/?igsh=Y3R3NmtsZnJmdjU%3D';
    const linkedIn='https://www.linkedin.com/in/anu-pandey-840821271/';
    res.render('connect',{instagram_link,linkedIn});
});


app.get('/about', function (req, res) {
    res.render('about');
});

app.listen(1000, () => {
    console.log('Server is running on port 1000');
});
