import express from 'express';
import routes from './routes/routes.js';
import connectDB from './db/connectdb.js';
import bodyParser from 'body-parser';
import path from 'path';
const app = express();
const port  = process.env.PORT || 8080;

const DATABASEURL= process.env.DATABASEURL||'mongodb://127.0.0.1:27017/portfolio';

app.use(bodyParser.urlencoded({extended: false}))
connectDB(DATABASEURL)
app.use(express.static(path.join(process.cwd(),'public')))

app.use('/', routes)
app.set('view engine', 'ejs');
app.set('views', './views')
app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})