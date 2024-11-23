const emailHelper= require("../helpers/email");

const sendMail=async (req,res)=>{
    try{
        emailHelper.mail(req.body.mail,req.body.message);
        res.status(200).json({message:"Email sent successfully"});
    }
    catch(error){
        res.status(500).json({message:"Error sending email"});
    }

}
module.exports={
    sendMail
}