var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");

// 회원정보
router.get('/',(req, res)=>{
    try{
        // 로그인 정보가 있을시
        if(req.session.user){
            res.render("info",{                     // 정보수정 페이지
                id: req.session.user.id,            // id
                name: req.session.user.name,        // 이름
                password: req.session.user.password,// 패스워드    
                email: req.session.user.email,      // 이메일
                text : " ",                         // 경고 메세지
            })
        }
        // 로그인정보가 없을시
        else{
            res.redirect('/login')  // 로그인페이지로 이동
        }
    }
    catch(err){
        res.render("error",{
            title : "회원정보 수정 페이지 오류 ",
            info : err,
        })
    }
});

router.post('/',(req,res)=>{
    id = req.session.user.id        // 회원 id
    Name = req.body.name            // 입력한 이름
    password = req.body.password    // 입력한 패스워드
    email = req.body.email          // 입력한 이메일
    // 입력창에 값을 모두 입력하면
    if(Name && password && email){
        // 입력한 값으로 회원정보를 수정
        mysql.query('UPDATE info SET info_name=?, info_password=?, info_email=? WHERE info_id=?',
        [Name, password, email, id],
        function(error, result){
            // 수정 실패
            if(error){
                res.render("error",{
                    title : "회원정보 수정 페이지 DB 오류 ",
                    info : error,
                })
            }
            // 수정 성공
            else{
                req.session.regenerate(function(err){  // 세션을 재생성
                    // 세션 재생성 실패
                    if(err){
                        console.log(err)
                        // res.redirect("/login")                
                    }
                    // 세션 재생성 성공
                    else{
                        // 아이디 값으로 검색
                        mysql.query('SELECT * FROM info WHERE info_id =?',
                        [id],
                        function(error, result, fields){
                            // 검색 실패
                            if(error){
                                console.log('쿼리문장에오류가있습니다.');
                            }
                            // 검색 성공
                            else{
                                req.session.user = {    // 재생성 하는 값
                                    id : result[0].info_id,
                                    password : result[0].info_password,
                                    name : result[0].info_name,
                                    email : result[0].info_email
                                }
                                res.redirect("/")   // 메인 홈으로 이동
                            }
                        })
                    }
                })
            }
        }
        )
    }
    // 입력창에 값에 입력을 안하면
    else{
        res.render("info",{
            id: req.session.user.id,                // id
            name: req.session.user.name,            // 이름
            password: req.session.user.password,    // 패스워드    
            email: req.session.user.email,          // 이메일
            text : "모든 정보를 입력해주세요",       // 경고 메세지
        });
    } 
})
// 라우터를 모듈화
module.exports= router;