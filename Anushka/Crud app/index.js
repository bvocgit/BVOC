import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/routes.js"


const app = express();
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});


app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;

const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL).then(() =>{
    console.log("Database connected")
    app.listen(PORT, () => {
        console.log(`Server is running on the port ${PORT}`);

    })
}).catch((error) =>console.log(error));

app.use("/api/user", route);