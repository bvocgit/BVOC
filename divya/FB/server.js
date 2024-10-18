var express = require('express');
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Feedback = require('./models/feedback');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');


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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

app.use(session({secret: 'your_secret_key', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/views/index.html');
    res.render('index.ejs', {
        'text' : ""
    });
});

// Middleware to handle POST data
var adminUser = {
    userName : 'admin',
    password : bcrypt.hashSync('adminpassword', 10)
};

// Passport local strategy for admin login
passport.use(new LocalStrategy(
    function(userName, password, done) {
        if (userName === adminUser.userName) {
            bcrypt.compare(password, adminUser.password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) return done(null, adminUser);
                return done(null, false, { message : 'Incorrect Password !'});

            });
        } else {
            return done(null, false, { message: 'Incorrect Username !'});
        }
    }
));

// Serialize and deserialize admin user
passport.serializeUser((user, done) => done(null, user.userName));
passport.deserializeUser((userName, done) => {

    if (userName === adminUser.userName) {
        done(null, adminUser);
    } else {
        done(null, false);
    }
});

// Middleware to protect admin routes
function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } 
    res.redirect('/admin-login');
}

// Admin login route
app.get('/admin-login', (req, res) => {
    // res.sendFile(__dirname + 'views\admin_login.ejs');
    res.render('admin_login', {
        'text' : ""
    });
});

app.post('/admin-login', 
    passport.authenticate('local', {
        successRedirect: '/admin-dashboard',
        failureRedirect: '/admin-login',
        failureFlash: true
    })
);

// Admin dashboard (show all feedbacks)
app.get('/admin-dashboard', ensureAuth, (req, res) => {
    // Fetch all feedbacks from MongoDB and render the page
    feedback.find({}, (err, feedbacks) => {
        if (err) {
            res.status(500).send("Failed to retrieve Feedbacks !!");
        } else {
            res.render('/admin-dashboard', {feedbacks: feedbacks });
        }
    });
});

// Admin logout
app.get('/admin-logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/admin-login');
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