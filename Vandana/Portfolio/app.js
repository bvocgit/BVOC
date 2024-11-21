const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Me' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Me' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on http://localhost:${PORT}'));