import { name } from "ejs"
import userModel from "../model/usermodel.js"


const homecontroller = async(req, res)=>{
    try{
        
        

        res.render('index')

    }
    catch(error){
        console.log(error.message)
    }
    
}
const ContactUserController = async(req,res)=>{
try{
    console.log(req.body)
    const data = await userModel({
        name:req.body.name,
        email:req.body.email,
        subject:req.body.subject,
        message: req.body.message,
    })
    if (data){
        await data.save()
        console.log("user saved succesfully")
    }
    res.render('index')
}
catch (error){
    console.log(error.message)
}
}
export {homecontroller,ContactUserController}