const nodemailer =require("nodemailer");
const ejs=require("ejs");
const path = require('path');

const transporter= nodemailer.createTransport({
    host:process.env.SMPT_HOST,
    port:process.env.SMPT_PORT,
    secure: false, 
    requireTLS:true,
    auth:{
        user:process.env.SMPT_USER,
        pass:process.env.SMPT_PASSWORD
    }
});

const mail= async(mail,message)=>{
    try{
        ejs.renderFile(path.join(__dirname,'../views/message.ejs'),{mail,message},(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                var mailOptions={
                    from:mail,
                    to:process.env.SMPT_USER,
                    subject: "message to Connect",
                    html: data
                };
                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        return console.log(error);
                    }
                    console.log("message sent to :%s",info.messageId);
                });
            }
        });
    }
    catch(err){
        console.log(err);
    }

}

   



