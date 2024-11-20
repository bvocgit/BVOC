import mongoose from "mongoose";

const connectDB = async(DATABASEURL)=>{
const DB_OPTIOS= {
    dbName:'portfolio',
}
const data = await mongoose.connect(DATABASEURL,DB_OPTIOS)
if(data){
    console.log("database connection succesfull..")
}
}

export default connectDB