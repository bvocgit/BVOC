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
    res.render('project',{githubLink});
});


app.get('/connect', function (req, res) {
    res.render('connect');
});


app.get('/about', function (req, res) {
    res.render('about');
});

app.listen(1000, () => {
    console.log('Server is running on port 1000');
    console.log(process.env.USER_MAIL);
});
