const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// Middleware to serve static files (CSS, JS, Images)
app.use(express.static('public'));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public',  'introduction.html'));
});

app.get('/skills', (req, res) => {
  res.sendFile(path.join(__dirname, 'public',  'skills.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public',  'contact.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

app.listen(port, () => {
  console.log(`Portfolio app listening at http://localhost:${port}`);
});