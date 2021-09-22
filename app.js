var express = require( 'express' )
var app = express()
const JWT = require('./public/jwtDecode');
const https = require('https');

var port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const { response } = require('express');
app.use(bodyParser.raw({
    type: 'application/jwt',
  }));
app.use( express.static('public') )

app.use(bodyParser.raw({
  type: 'application/jwt',
}));
app.use('/journey/execute/code',(req,res)=>{
    console.log("execute");
    console.log("--------------");
    console.log(JWT(req.body.toString())) 
    console.log("execute");
    res.send({"status":"ok"})
});
app.use('/journey/execute/',(req,res)=>{
    console.log("execute");
    console.log("execute");
    let inputData  = JWT(req.body.toString())
    console.log("input daa ",inputData)
    console.log("inputData['inArguments']",inputData['inArguments'])
    if(inputData && inputData['inArguments'] && inputData['inArguments'].length>0){
        console.log("inside if")
        let couponInput = inputData['inArguments'][0];
        let inputForCoupon = [];
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
        inputForCoupon['DropdownOptions']   = couponInput['DropdownOptions'];
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
                response.send({"code":str})
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
});
app.use('/journey/save/', (req,res)=>{
    console.log("save");
    console.log(JWT(req.body.toString())) 
    console.log("save");
    res.send({"status":"ok"})
});
app.use('/journey/publish/',(req,res)=>{
    console.log("publish");
    console.log("publish");
    console.log(JWT(req.body.toString())) 
    console.log("publish");
    res.send({"status":"ok"})
});
app.use('/journey/validate/',(req,res)=>{
    console.log("validate");
    console.log("validate");
    console.log(JWT(req.body.toString())) 
    console.log("validate");
    res.send({"status":"ok"})
});

app.listen( port, () => console.log( `App listening on port ${port}!`) )
