'use strict'
const navBar = document.querySelector('.navbar');
const bars = document.querySelector('.fa-bars');
const barsMenu = document.querySelector('.navbar_menu')
const btn = document.querySelector('.btn')
const gotop = document.querySelector(".goTop")

function barsClick(){
    barsMenu.classList.toggle('barsClick');
}

function scrollEvent(){
    const scrolly = window.scrollY;
    if(scrolly > 10){
        navBar.classList.add('sticky');
    } else{
        navBar.classList.remove('sticky');
    }
}

function init(){
    window.addEventListener("scroll",scrollEvent);
    bars.addEventListener("click", barsClick);
    btn.addEventListener("click",()=>{
        console.log("click")
    })

    window.addEventListener('scroll', () => {
        let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
        let windowHeight = window.innerHeight; // 스크린 창
        let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x
    
        if(scrollLocation > 60 ){
            gotop.style.color = "#fff"
        }
        else if(scrollLocation < 60 ){
            gotop.style.color = "#396afc"
        }
    })
}
init();