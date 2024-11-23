import UserModel from "../model/userModel"


const homeController = asyn (req,res)=>{
    try {
       const data = await UserModel({
            name:"Ajay kumar",
            email:"ajay@gmail.com",
            subject:"full stack devloper",
            message:"hello",
        })
        if(data){
            await data.save(
                console.log("user saved succesfully")
            )
        }

    }catch ( error ){
        console.log(error.message)
    }


    res.render("index")
}
export { homeController}