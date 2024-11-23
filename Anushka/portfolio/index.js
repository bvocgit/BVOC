import express from 'express';
import routes from './routes/routes.js';
import path from 'path';
const app = express();
const port = process.env.port || 8080


app.use(express.static(path.join(process.cwd(), 'public')))
app.set('views engine', 'ejs');
app.set('views','/views')

app.use('/',routes)
app.listen(port, ()=>{
    console.log('server is running on port ${port]')
})