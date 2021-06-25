// var exec = require('child_process').exec
// function CERT_createKey(CN, keylen,callback){
//     exec('openssl genrsa -out'+CN+'.key'+keylen, function(error, stdout, stderr){
//         if(error !==null){
//             console.log("Create Cert Key : "+error);
//             callback({fail:true,error:error});
//             }   else{
//                 callback({fail:false,error:"none"});
//             }
//     });
// }
// function CERT_csr(CN,callback){
//     exec('openssl req -new -key '+CN+'.key -nodes -subj "/C=KR/O=noweek, Inc./OU=www.securekim.com/OU=(c) 2018 noweek, Inc./CN='
//     +CN+'" -out '+CN+'.csr', function(error, stdout, stderr) {
//     if(error !== null) {
//     console.log("Create CSR : " + error);
//     callback({fail:true,error:error});
//     } else {
//     callback({fail:false,error:"none"});
//     }
//     }); }
//     function CERT_sign(CSR,CA,days,callback){
//         //openssl x509 -req -days 500 -in demo.csr -CA CA-CA.crt -CAkey root.key -CAcreateserial -out my.crt
//         var execstr = 'openssl x509 -req -days '+days+' -in '+CSR+'.csr -signkey '+CA+'.key -out '+CSR+'.pem'
//         if(CSR !== CA) execstr = 'openssl x509 -req -days '+days+' -in '+CSR+'.csr -CA '+CA+'.pem -CAkey '
//         +CA+'.key -CAcreateserial -out '+CSR+'.pem';
//         exec(execstr, function(error, stdout, stderr) {
//         if(error !== null) {
//         console.log("Sign CSR : " + error);
//         callback({fail:true,error:error});
//         } else {
//         callback({fail:false,error:"none"});
//         }
//         }); }
//         function CERT_createCERT(CA,CN,callback){
//             CERT_createKey(CN,2048,(result)=>{ //키 만들기
//             if(result.fail) return callback(false);
//             CERT_csr(CN,(result)=>{ //CN 에 대한 CSR 만들기
//             if(result.fail) return callback(false);
//             CERT_sign(CN,CA,14,(result)=>{ // CN을 CA로 사인하기
//             if(result.fail) return callback(false);
//             else return callback(true);
//             });
//             });
//             });
//             }
//             function CERT_createCA(CN,callback){
//                 CERT_createKey(CN,4096,(result)=>{ // 키 만들기
//                     if(result.fail) return callback(false);
//                     CERT_csr(CN,(result)=>{ // CN에 대한 CSR 만들기
//                         if(result.fail) return callback(false);
//                         CERT_sign(CN,CN,36500,(result)=>{ // 셀프사인
//                             if(result.fail) return callback(false);
//                             else return callback(true);
//                 })});});}
//                 main()
//                 function main(){
//                 CERT_createCA("CA", ()=>{
//                 CERT_createCERT("CA","CN",()=>{})
//                 })
//                 }
var exec = require('child_process').exec
function CERT_createKey(CN,keylen,callback){
exec('openssl genrsa -out '+CN+'.key '+keylen, function(error, stdout, stderr) {
if(error !== null) {
console.log("Create Cert Key : " + error);
callback({fail:true,error:error});
} else {
callback({fail:false,error:"none"});
}
});
}
function CERT_csr(CN,callback){
    exec('openssl req -new -key '+CN+'.key -nodes -subj "/C=KR/O=noweek, Inc./OU=www.securekim.com/OU=(c) 2018 noweek, Inc./CN='
    +CN+'" -out '+CN+'.csr', function(error, stdout, stderr) {
    if(error !== null) {
    console.log("Create CSR : " + error);
    callback({fail:true,error:error});
    } else {
    callback({fail:false,error:"none"});
    }
    }); }
    function CERT_sign(CSR,CA,days,callback){
        //openssl x509 -req -days 500 -in demo.csr -CA CA-CA.crt -CAkey root.key -CAcreateserial -out my.crt
        var execstr = 'openssl x509 -req -days '+days+' -in '+CSR+'.csr -signkey '+CA+'.key -out '+CSR+'.pem'
        if(CSR !== CA) execstr = 'openssl x509 -req -days '+days+' -in '+CSR+'.csr -CA '+CA+'.pem -CAkey '
        +CA+'.key -CAcreateserial -out '+CSR+'.pem';
        exec(execstr, function(error, stdout, stderr) {
        if(error !== null) {
        console.log("Sign CSR : " + error);
        callback({fail:true,error:error});
        } else {
        callback({fail:false,error:"none"});
        }
        }); }
        function CERT_createCERT(CA,CN,callback){
            CERT_createKey(CN,2048,(result)=>{ //키 만들기
            if(result.fail) return callback(false);
            CERT_csr(CN,(result)=>{ //CN 에 대한 CSR 만들기
            if(result.fail) return callback(false);
            CERT_sign(CN,CA,14,(result)=>{ // CN을 CA로 사인하기
            if(result.fail) return callback(false);
            else return callback(true);
            });
            });
            });
            }
            function CERT_createCA(CN,callback){
                CERT_createKey(CN,4096,(result)=>{ // 키 만들기
                if(result.fail) return callback(false);
                CERT_csr(CN,(result)=>{ // CN에 대한 CSR 만들기
                if(result.fail) return callback(false);
                CERT_sign(CN,CN,36500,(result)=>{ // 셀프사인
                if(result.fail) return callback(false);
                else return callback(true);
                })});});}
                main()
                function main(){
                CERT_createCA("CA", ()=>{
                CERT_createCERT("CA","CN",()=>{})
                })
                }
