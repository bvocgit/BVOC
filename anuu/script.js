// const fs = require('node:fs');
// const http=require('http');
// const server=http.createServer(function(req,res){
//     res.end("helloworld");
// })
// server.listen(3000);

// fs.writeFile("hey.txt","hello anu",function(err){
//     if(err){
//         console.log(err);}
//         else{
//             console.log("done");
//         }
// });


// fs.appendFile("hey.txt","kaisi ho?",function(err){
//     if(err){
//         console.log(err);}
//         else{
//             console.log("done");
//         }
// });

//  s.rename("hey.txt","hello.txt",function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("done");
//     }
//  });


//  fs.copyFile("hello.txt","./copy/copy.txt",function(err){
//     if(err){
//         console.log(err.message);
//     }
//     else{
//         console.log("done");
//     }
//  });

// fs.unlink("hey.txt",function(err){
//     if(err) console.error(err);
//     else console.log("removed");
// }

// );
//framework=> flow of the work provides
//example => angular and express js 
//manages everything from recieving to response 

//react => gives the tools not the flow of the work

// to see the instant changes one need to install nodemon package.
//then start the script everytime and get the instant changes on the server 


//routes create krna 
const express=require('express')
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(function(req,res,next){
    console.log("middle ware chala");
    next();
});

app.use(function(req,res,next){
    console.log("middle ware ek baar aur chala");
    next();
});
//next=> is used to put the runnig thing to the next the middleware

app.get('/',function(req,res){
    res.send("hello world")
})
app.get("/profile",function(req,res,next){
    return next(new Error("something went wrong"));

})
// server chalana isey kehtey hain and need to give the port
app.listen(3000);
console.log("anu");


//Middleware.
//jo bhi kaam hum route se pehle krvana chahate hain toh middlewafre use krte hain
 //use case of middleware

 //1) attaching the user details and then forwarding the route

//request and response handling
//frontend => backend => frontend

//error handling 
app.use((err,req,res,next) =>{
    console.error(err.stack);
    res.status(500).send("something broke!")
})




