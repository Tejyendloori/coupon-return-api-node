var express = require( 'express' )
const request = require('request');
var app = express()
var port = process.env.PORT || 3000
const https = require('https');
const { response } = require('express');


// app.use( express.static('public') )
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
/* dinesh code starts here */
app.get("/", (request,response)=>{
  console.log("root get request")
  response.send({code:"rooot"})
} )
app.post("/", (request, response)=>{
  console.log("chageing get coupon code end point to root")
    var postData = request.body;

    //Or if this doesn't work
    console.log("poost", postData)
    const data = new TextEncoder().encode(
        JSON.stringify(postData)
      )
    const options = {
        hostname: 'jbcarestapi.herokuapp.com',
        port: 443,
        path: '/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
          }
      }
      let code = ""
      const req = https.request(options, res => {
          let str = ''
          res.on('data', function (chunk) {
            str += chunk;
        });

        res.on('end', function () {
            console.log(req.data);
            console.log(str);
            // your code here if you want to use the results !
            response.send({"code":str})
        });
      })
    
      req.on('error', error => {
        console.error(error)
        response.send({"code":""})
      })
      req.write(data)
      req.end()    
});
app.post("/master", (req,response)=>{
    console.log("execute");
    let inputData  = req.body
    console.log("input daa ",inputData)
    console.log("inputData['inArguments']",inputData['inArguments'])
    if(inputData && inputData['inArguments'] && inputData['inArguments'].length>0){
        console.log("inside if")
        let couponInput = inputData['inArguments'][0];
        let inputForCoupon = {};
        inputForCoupon['TransId']           = couponInput['TransId'];
        inputForCoupon['AmountUsed']        = couponInput['AmountUsed'];
        inputForCoupon['MembershipId']      = couponInput['MembershipId'] ;
        inputForCoupon['MemberPhone']       = couponInput['MemberPhone'];
        inputForCoupon['Sequence']          = couponInput['Sequence'];
        inputForCoupon['BalanceType']       = couponInput['BalanceType'] ;
        inputForCoupon['RecognitionId']     = couponInput['RecognitionId'];
        inputForCoupon['MemberEmail']       = couponInput['MemberEmail'];
        inputForCoupon['SchemeId']          = couponInput['SchemeId'];
        inputForCoupon['VoucherExpiry']     = couponInput['VoucherExpiry'];
        inputForCoupon['BalancePoints']     = couponInput['BalancePoints'];
        inputForCoupon['IsEnrollment']      = couponInput['IsEnrollment'];
        inputForCoupon['MemberType']        = couponInput['MemberType'];
        inputForCoupon['TransactionDate']   = couponInput['TransactionDate'];
        inputForCoupon['TransAmount']       = couponInput['TransAmount'];
        inputForCoupon['ComplexName']       = couponInput['ComplexName'];
        console.log(inputForCoupon)
        const data = new TextEncoder().encode(
            JSON.stringify(inputForCoupon)
        )
        console.log("started to call API ",data)
        const options = {
            hostname: 'jbcarestapi.herokuapp.com',
            port: 443,
            path: '/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
              }
        }
        const req = https.request(options, res => {
            let str = ''
            res.on('data', function (chunk) {
                str += chunk;
            });
            res.on('end', function () { 
                console.log("api end coupon is ", str)
                response.send({code:str})
            });
          })
          req.on('error', error => {
            console.error(error)
            response.send({"code":""})
          })
          req.write(data)
          req.end()   
    }else{
        console.log("else wrong input");
        response.send({"error":true})
    }
})
app.get("/execute", (request,response)=>{
  console.log("get request")
  response.send({code:"sampleget"})
} )
app.post("/execute", (request,response)=>{
  console.log("post request")
  response.send({code:"sample post"})
} )
app.post("/publish", (request,response)=>{
  console.log("publish request")
  response.send({code:"sample publish"})
} )
app.post("/validate ", (request,response)=>{
  console.log("validate  request")
  response.send({code:"sample validate "})
} )
app.post("/save ", (request,response)=>{
  console.log("save  request")
  response.send({code:"sample save "})
} )
/* dinesh code starts here */

app.listen( port, () => console.log( `App listening on port ${port}!`) )
