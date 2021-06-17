var dgram = require('dgram');
var buf1 = Buffer.from('i am alice ');
var buf2 = Buffer.from('or bob');
var client = dgram.createSocket('udp4');
client.send([buf1,buf2],41234,'172.30.12.82', (err)=>{
    if(err){
        console.log(err)
    }
    client.close();
});