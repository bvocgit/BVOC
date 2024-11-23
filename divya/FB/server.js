var express = require('express');
var path = require("path");
var mongoose = require('mongoose');
var Feedback = require('./models/feedback');


mongoose.connect("mongodb+srv://Divya0405:Divya0405@meradb.z2dszqk.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to MongoDB Atlas !");
}).catch((err) => {
    console.log("Error connecting to MongoDB Atlas :", err);
});



var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static('views'));


app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/views/index.html');
    res.render('index.ejs', {
        'text' : ""
    });
});

//to submit Feedbacks
app.post('/submit-feedback', async (req, res) => {
    try {
        var { name, email, feedback, category, confidential } = req.body;

       
        if (confidential === 'confidential') {
            
            const userEmail = req.user ? req.user.email : 'unknown@example.com'; 
            const fbData = {
                category,
                feedback,
                confidential: true,
                name: 'Anonymous',  
                email: userEmail,    // Use derived email
            };

            const newFeedback = new Feedback(fbData);
            await newFeedback.save();
        } else {

            var fbData = {
                category,
                feedback,
                confidential: false,
                name: name,
                email: email,
            };

            var newFeedback = new Feedback(fbData);
            await newFeedback.save();
        }
        res.send('Thank you for your feedback!');
    } catch (err) {
        console.error('Error saving feedback:', err);
        res.status(500).send('Error submitting feedback');
    }
});

// To show all feedbacks
app.get('/show-feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find(); 
        res.render('show_feedback.ejs', { feedbacks });
    } catch (err) {
        console.error('Error fetching feedback data:', err);
        res.status(500).send('Error retrieving feedback data');
    }
});

// To delete Feedback
app.post('/delete-feedback', async (req, res) => {
    try {
        const { id } = req.body;
        await Feedback.findByIdAndDelete(id); // Delete feedback by ID
        res.redirect('/show-feedback');
    } catch (err) {
        console.error('Error deleting feedback:', err);
        res.status(500).send('Error deleting feedback');
    }
});

// To update Feedback
app.post('/update-feedback', async (req, res) => {
    try {
        const { id, feedback } = req.body;
        await Feedback.findByIdAndUpdate(id, { feedback }); // Update feedback content
        res.redirect('/show-feedback');
    } catch (err) {
        console.error('Error updating feedback:', err);
        res.status(500).send('Error updating feedback');
    }
});


app.listen(8080); 