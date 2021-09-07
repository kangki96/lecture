const request = require('request')
const { v4: uuidv4 } = require('uuid'); //npm install uuidv4 --save
const sign = require('jsonwebtoken').sign
const crypto = require('crypto')
const queryEncode = require("querystring").encode

const access_key = "TEST_ACCESSKEY5"
const secret_key = "TEST_SECRET_KET"
const server_url = "http://ubuntu.securekim.com"

async function getBalance(){
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
    }
    const token = sign(payload, secret_key)
    const options = {
        method: "GET",
        url: server_url + "/v1/accounts",
        headers: {Authorization: `Bearer ${token}`},
    }
    return new Promise(function(resolve, reject) {
        request(options, (error, response, body) => {
            if (error) reject();
            console.log(response.statusCode) 
            resolve(body)
        })
    });
}

//얼마너치살건지
async function API_buyImmediate(market, price){ 
    const body = {
        market: market,
        side: 'bid',
        volume: null,
        price: price.toString(),
        ord_type: 'price',
    }
    const query = queryEncode(body)
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }
    const token = sign(payload, secret_key)
    const options = {
        method: "POST",
        url: server_url + "/v1/orders",
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }
    return new Promise(function(resolve, reject) {
        request(options, (error, response, body) => {
            if (error) reject();
            console.log(response.statusCode) 
            resolve(body)
        })
    });
}

//몇개팔건지
async function API_sellImmediate(market, volume){
    const body = {
        market: market,
        side: 'ask',
        volume: volume.toString(),
        price: null,
        ord_type: 'market',
    }
    const query = queryEncode(body)
    const hash = crypto.createHash('sha512')
    const queryHash = hash.update(query, 'utf-8').digest('hex')
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
    }
    const token = sign(payload, secret_key)
    const options = {
        method: "POST",
        url: server_url + "/v1/orders",
        headers: {Authorization: `Bearer ${token}`},
        json: body
    }
    return new Promise(function(resolve, reject) {
        request(options, (error, response, body) => {
            if (error) reject();
            console.log(response.statusCode) 
            resolve(body)
        })
    });
}

async function main(){
    //// ERROR TEST - BUY ////
    //body = await getBalance()
    //body = await API_buyImmediate("KRW-ETH", 2000000);   // 정상 구매 
    //
    //36609686
    //36604449
    //1.0138627037817458
    //1.014008084593923
    //348583.84272261686
    //353695.55995306565
    body = await API_buyImmediate("KRW-ETH", 100000);   // 정상 구매
    console.log(body);
    // body = await API_buyImmediate("KRW-BTC", 500000);   // 정상 구매
    // body = await API_sellImmediate("KRW-BTC", 1.0);     // 정상 판매
    // body = await API_buyImmediate("KRW-BTC", -1);       // 범위 에러
    // body = await API_buyImmediate("KRW-BTC", 1);        // 최소 에러
    // body = await API_buyImmediate("KRW-BTC", 5234);     // 단위 에러..안남
    // body = await API_buyImmediate("KRW-BTC", "");       // 가격 에러
    // body = await API_buyImmediate("KRW-BTC", 100000000);  // 가격 에러
    // body = await API_buyImmediate("KRW-ABC", 10000);    // 마켓 에러
    // body = await API_buyImmediate("", 10000);           // 마켓 에러
    // body = await API_buyImmediate("KRW-ABC-BTC", 10000);// 마켓 에러
    // body = await API_sellImmediate("KRW-BTC", 100);      // 개수 에러
}


main()