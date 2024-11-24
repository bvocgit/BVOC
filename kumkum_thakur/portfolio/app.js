const express = require('express');
const app = express();

// Set up EJS templating engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Home page route
app.get('/', (req, res) => {
    res.render('index');
});

// About page route
app.get('/about', (req, res) => {
    res.render('about');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});