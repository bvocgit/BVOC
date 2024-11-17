const express = require('express');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Built-in middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', recipeRoutes);

// Start the server
const PORT = 8082;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
