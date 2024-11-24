const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const db = require("./config/mongoose-connection");

require("dotenv").config();

const index = require("./routes/index")
const ownersRouter =require("./routes/ownerRouter"); 
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized: false,
        secret: process.env.JWT_KEY,
    })
);
app.use(flash());

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/",index)
app.use("/owners", ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.listen(3000);