const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");


mongoose
.connect(`${config.get("MONGODB_URI")}/CURD_APP`)
.then(function(){
    dbgr("connected");
    console.log("conntected");
})
.catch(function(err){
    dbgr(err);
})
module.exports = mongoose.connection;