const express = require('express');
const { taskRouter, pingRouter } = require('./routes');
const app = express();

app.use(express.json()); //POST,PUT

app.use('/ping', pingRouter);

app.use('/api/v1/task', taskRouter)
//CRUD

app.listen(8080, ()=>{
    console.log('server is running on port:8080');
});