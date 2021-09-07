var express = require("express");
var router = express.Router(); 


// 에러페이지
router.get('/',(req, res)=>{
    res.render("error",{
        title : " ",
        info : " ",
    })
});

// 라우터를 모듈화
module.exports= router;