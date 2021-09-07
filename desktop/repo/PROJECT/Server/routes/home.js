var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");

// 홈페이지
router.get('/',(req, res)=>{
    try{
        //세션이 존재하면
        if(req.session.user){
            // // 세션확인  
            // console.log(req.session.user)
            res.render('home'
            ,{
                name : req.session.user.name,
                // email:req.session.user.email
            }
            )   // 세션정보의 사용자 이름을 변수로 보냄
        }
        //세션이 존재하지 않으면 
        else{
            res.redirect("/login")  //로그인 창으로 이동
        }
    }
    catch(err){
        res.render("error",{
            title : "메인 홈페이지 오류 ",
            info : err,
        })
    }
});


// 라우터를 모듈화
module.exports= router;