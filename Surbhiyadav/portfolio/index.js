import express from 'express';
import routes from './routes/routes.js';
import path from 'path';
const app = express(); 
const port = process.env.port || 8080

//setup for static file
app.use(express.static(path.join(process.cwd(),'public')))

//ejs setup/comfiguration
app.set('view engine','ejs');
app.set ('views','./views')

//create routes
app.use('/',routes)

app.listen(port, ()=>{
    console.log('server is running on port https//:localhost:{port}')
})