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

// var feedbackSchema = new mongoose.Schema({
//     name : String,
//     email : String,
//     feedback : String,
//     category : String,
//     confidential : Boolean
// });

// var Feedback = mongoose.model('Feedback', feedbackSchema);

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('views'));


app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/views/index.html');
    res.render('index.ejs', {
        'text' : ""
    });
});


app.post('/submit-feedback', async (req, res) => {
    try {
        var { name, email, feedback, category, confidential } = req.body;

        // let fbData = {
        //     feedback : feedback,
        //     category : category,
        //     confidential : confidential === 'confidential'
        // };

        // if (confidential !== 'confidential') {
        //     fbData.name = name;
        //     fbData.email = email;
        // } else {
        //     fbData.email = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // }

        // var newFeedback = new Feedback(fbData);
        // newFeedback.save((err) => {
        //     if (err) {
        //         res.send("Error saving feedback !");
        //     }
        //     else {
        //         res.send("Feedback submitted successfully !");
        //     }
        // });

        // var fbData = new Feedback({
        //     name : confidential === 'confidential' ? undefined : name,
        //     email : confidential === 'confidential' ? undefined : email,
        //     feedback : feedback,
        //     category : category,
        //     confidential : confidential === 'confidential'
        // });

        // fbData.save((err) => {
        //     if (err) {
        //         res.send("Error saving feedback !");
        //     }
        //     else {
        //         res.send("Feedback submitted successfully !");
        //     }

        if (confidential === 'confidential') {
            // If confidential, derive the email from backend (assuming some user authentication is in place)
            const userEmail = req.user ? req.user.email : 'unknown@example.com'; // Replace with your auth logic
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

app.listen(8080); 