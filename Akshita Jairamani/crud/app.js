const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
const contactRoutes = require('./routes/contacts');
app.use('/', contactRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
