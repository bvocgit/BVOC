var express=require("express");
var router = express.Router();


router.get('/insert',(req,res) =>{
    res.status(200);
    res.write('akshita');
    res.end();
});

router.get('/delete',(req,res) =>{
    res.status(200);
    res.write('akshima');
    res.end();
});

router.get('/show',(req,res) =>{
    res.status(200);
    res.write('anamta');
    res.end();
});

module.exports = router;