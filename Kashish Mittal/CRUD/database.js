const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/crudapp").then(()=>{
  console.log("connection successful")  
}).catch((e)=>{
    console.log(e);
})

const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const Usermodel = mongoose.model("User",Schema);
module.exports = Usermodel;