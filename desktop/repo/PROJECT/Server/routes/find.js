var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");

// 아이디 와 패스워드 찾기
router.get('/',(req, res)=>{
    try{
        res.render('find',{
            name:" ",
            id:" "
        })
    }
    catch(err){
        res.render("error",{
            title : "아이디 / 패스워드 페이지 오류 ",
            info : err,
        })
    }
});

// 입력한 정보를 받을때
router.post('/',(req, res)=>{
    var name = req.body.name;   // 입력한 이름
    var id = req.body.id;       // 입력한 아이디
    mysql.query('SELECT * FROM info WHERE info_name =? OR info_id =?',
    [name,id],
    function(error,result){
        // DB 접근 실패시
        if(error){
            res.render("error",{
                title : "아이디 / 패스워드 페이지 오류 ",
                info : error,
            })
        }
        // DB에 정상접근
        else{
            // 입력한 값의 정보가 존재하지 않을경우
            if(result[0]==undefined){
                res.render('find',{
                    name: " ",
                    id:" "
                })
            }
            // 입력한 이름의 정보가 존재하는 경우
            else if(result[0].info_name == name){
                res.render('find',{
                    name: `아이디 : ${result[0].info_id}`,
                    id:" "
                })
            }
            // 입력한 아이디의 정보가 존재하는 경우
            else if(result[0].info_id == id){
                res.render('find',{
                    name: " ",
                    id:`패스워드 : ${result[0].info_password}`
                })
            }
        }
    });
});

// 라우터를 모듈화
module.exports= router;