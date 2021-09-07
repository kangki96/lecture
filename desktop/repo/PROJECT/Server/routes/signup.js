var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");

// 회원가입 페이지
router.get('/',(req, res)=>{
    try{
        res.render("signup",{
            id_text:"문자, 숫자를 10자 이내 작성 하여 주세요.",     // 아이디 span
            pass_text : "문자, 숫자를 10자 이내 작성 하여 주세요.", // 패스워드 span
            password_text: " ",                                   // 패스워드 확인 span
        });
    }
    catch(err){
        res.render("error",{
            title : "회원가입 페이지 오류 ",
            info : err,
        })
    }
});

// 회원정보 입력시
router.post('/',(req, res)=>{
    var firstname = req.body.firstname;                 // 성
    var lastname = req.body.lastname;                   // 이름
    var name = firstname + lastname;                    // 성+이름
    var id = req.body.id;                               // 아이디
    var password = req.body.password;                   // 비밀번호
    var password_confirm = req.body.password_confirm;   // 비밀번호 확인
    var emali = req.body.emali;

    // 모든정보를 입력시
    if( name && id && password && password_confirm && emali){
        // 패스워드가 동일 하면
        if(password == password_confirm){
            // DB info 테이블에 정보 추가
            mysql.query('INSERT INTO info(info_name, info_id , info_password, info_email) VALUES(?,?,?,?)',
            [name, id, password, emali],
            function(error, result){
                // 에러발생시 (이미 존재하는 아이디 작성시 왜? 아이디가 기본키이다!!)
                if(error){
                    res.render("signup",{
                        id_text:"이미 존재하는 아이디 입니다.",                 // 아이디 span
                        pass_text : "문자, 숫자를 10자 이내 작성 하여 주세요.", // 패스워드 span
                        password_text: " ",                                   // 패스워드 확인 span
                    });
                }
                // 정상 동작시
                else{
                    res.redirect('/login'); // 로그인창으로 이동
                }
            });
        }
    }
    // 아이디 입력 안하면
    if(!name){
        res.render("signup",{
            id_text:"이름을 입력하세요!!!",
            pass_text : "이름을 입력하세요!!!",
            password_text: "이름을 입력하세요!!!",
        });
    }
    // 아이디 입력 안하면
    if(!id){
        res.render("signup",{
            id_text:"아이디를 입력 해주세요!!!",
            pass_text : "문자, 숫자를 10자 이내 작성 하여 주세요.",
            password_text: " ",
        });
    }
    // 비밀변호 입력 안하면
    else if(!password){
        res.render("signup",{
            id_text:"문자, 숫자를 10자 이내 작성 하여 주세요.",
            pass_text : "비밀번호를 입력 해주세요!!!",
            password_text: " ",
        });
    }
    // 비밀번호가 서로다르면
    if(password != password_confirm && id){  
        res.render("signup",{
            id_text:"문자, 숫자를 10자 이내 작성 하여 주세요.",
            pass_text : "비밀번호가 일치하지 않습니다!!!",
            password_text: "비밀번호가 일치하지 않습니다!!!",
        });
    }
});
// 라우터를 모듈화
module.exports= router;