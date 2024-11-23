import express from 'express';
import routes from './routes/routes.js';

const app = express();

// Use routes
app.use('/', routes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
