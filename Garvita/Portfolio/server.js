var express  = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render("main",{"name":"Garvita Aggarwal",
        "course":"Bvoc Web Designing",
        "email": "XXXXXX@gmail.com"

    });
});

app.get('/myPortfolio',(req,res)=>{
    res.render("index",{"name":"Garvita Aggarwal",
        "email": "XXXXXX@gmail.com"
    });
});



app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000/');
});