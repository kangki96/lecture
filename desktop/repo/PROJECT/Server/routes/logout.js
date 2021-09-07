var express = require("express");
var router = express.Router(); 
// var mysql= require("./mysql");

// 로그아웃
router.get('/',(req, res)=>{
    req.session.destroy(function(err){  // 세션 제거
        // 세션 제거 실패시
        if(err){
            res.render("error",{
                title : "로그아웃 오류 ",
                info : err,
            })               
        }
        // 세션 제거 성공
        else{
            // 세션이 없으면                               
            if(!req.session){               
                res.redirect("/login")  // 로그인 페지이로 이동
            }
        }
    })
});

// 라우터를 모듈화
module.exports= router;