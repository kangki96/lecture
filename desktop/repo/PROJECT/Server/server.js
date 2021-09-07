var express = require("express"); 	
var app = express();
var mysql= require("./routes/mysql");
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(express.urlencoded({ extended : true  }));
app.use(express.static(__dirname+ "./routes"));
mysql.connect();

var login = require("./routes/login");
app.use('/api/person',login);    // 로그인 

app.listen(8080)
