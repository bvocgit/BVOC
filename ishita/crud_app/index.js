const http= require("http");
const myServer= http.createServer((req, res) => {
    console.log("new req rec");
    res.end("hello from server again");
});

myServer.listen(8000, () => console.log("server started again"));
