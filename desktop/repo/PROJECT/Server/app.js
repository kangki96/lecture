var express = require("express"); 	
var app = express();
var mysql= require("./routes/mysql");
var cookieParser= require('cookie-parser');
var session = require("express-session");

app.use(session({
    secret : 'secret key',
    resave : false,
    saveUninitialized: true,
    name : "user",
    cookie: {
        maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
}));

// __dirname 은 file명을 제외한 절대경로
app.use(cookieParser());
app.use(express.urlencoded({ extended : true  }));
app.use(express.static(__dirname+ "/public"));
app.set("views", __dirname+ "/views");
app.set("view engine", "ejs");
mysql.connect();

var home = require("./routes/home");   
var login = require("./routes/login");
var signup = require("./routes/signup");
var find = require("./routes/find");
var logout = require("./routes/logout");
var info = require("./routes/info");
var error = require("./routes/error");

app.use('/',home);          // 메인 홈
app.use('/login',login);    // 로그인 
app.use('/signup',signup);  // 회원가입 
app.use('/find',find);      // 아이디 패스워드 찾기
app.use('/logout',logout);  // 로그아웃
app.use('/info',info);      // 회원정보
app.use('/error',error);    // 회원정보


app.listen(3000)