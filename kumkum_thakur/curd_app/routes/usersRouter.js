const express = require('express');
const router =express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");
const { compare } = require('bcrypt');

router.get("/", function(req,res){
    res.send("hey");
});

router.post("/register",async function(req,res){
    try{
        let {email, fullname , password} = req.body;
        let user = await userModel.findOne({email:email});
        if(user) return res.status(401).send("you already have an account ,please login.")
    bcrypt.genSalt(10, function (err, salt){
    bcrypt.hash(password,salt,async function(err, hash){
        if (err) return res.send(err.message);            
        else{
         let user = await userModel.create({
             email, fullname , password: hash
           });
          let token = generateToken(user);
          res.cookie("token",token);
           res.send("user created successfully");
        }
    })
})       
    }catch(err){
      console.log(err.message);
    }
});

router.post("/login",async function (req, res) {
    
    let {email , password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) return res.send("email or password incorrect");

    bcrypt.compare(password,user.password,function(err ,result){
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.send("you can login");
        }
        else{
            return res.send("emailor password incorrect");
        }
    });    
})

module.exports =router;