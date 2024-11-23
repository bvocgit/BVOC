
import mongoose from "mongoose";

const connectDB = async (DATABASEurl) =>{
    const DB OPTIONS = {
        dbname: 'portfolio',

    }
    const data = await mongoose.connect(DATABASEURL ,DB_OPTIONS)
    if(data){
        console.log("Database connection succesful...")
    }


}
export default connectDB


   