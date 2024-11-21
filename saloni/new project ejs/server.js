//console.log("hello");

const express = require('express');

const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// POST route to handle form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
  
    // Save the message to a JSON file 
    const newMessage = { name, email, message };
    const filePath = './messages.json';
  
    fs.readFile(filePath, (err, data) => {
      let messages = [];
      if (!err) {
        messages = JSON.parse(data); 
      }
      messages.push(newMessage); 
  
      
      fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
        if (err) {
          console.error('Error saving message:', err);
          return res.status(500).send('Internal Server Error');
        }
        console.log('Message saved:', newMessage);
        res.redirect('/'); 
      });
    });
  });
  
app.set("view engine","ejs");
app.get('/',function(req,res){
    res.render('demo.ejs',{
        "name":"saloni",
        "course":"B.voc Web Designing",
        "greet":"Welcome to my Portfolio",
        "projects": "a personal portfolio website, a small e-commerce site, and a JavaScript-based games",
        "msg":"Hello! I'm Saloni, a passionate  Web Developer",
        "interest":"web development, coding, and creating innovative tech solutions",
        "university":"University of Delhi",
        "skills":"HTML, CSS, JavaScript, express js, node.js, Mysql, java and Python",
        "hobbies": "listening music, playing badminton"

    })
})
app.listen(7000);