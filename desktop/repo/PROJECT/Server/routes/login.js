var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");

router.get('/', (req,res)=>{
  res.send({
      name:"jb",
      age:26,
      emali:"@",
      gender: "men"
  })
})

router.post('/', (req,res)=>{
  console.log(req.body)
  res.send("ok")
})


module.exports= router;