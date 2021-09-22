var express = require( 'express' )
var app = express()
const JWT = require('./public/jwtDecode');
const https = require('https');
global.TextEncoder = require("util").TextEncoder;


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
app.use('/journey/execute/',(request,response)=>{
    console.log("Execution Starts");
    let inputData  = JWT(request.body.toString())
    if(inputData && inputData['inArguments'] && inputData['inArguments'].length>0){
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
        const data = new TextEncoder().encode(
            JSON.stringify(inputForCoupon)
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
        console.log("Thired part API calling")
        const req = https.request(options, res => {
            let str = ''
            res.on('data', function (chunk) {
                str += chunk;
            });
            res.on('end', function () { 
                console.log("Third Part API has completed. Returning coupon is  ", str)
                response.send({code:str})
            });
        })
        req.on('error', error => {
            console.log("Third Part API has error - ",error)
            response.send({"code":""})
        })
        req.write(data)
        req.end()   
    }else{
        console.log("Input for API is wrong");
        response.send({"error":true})
    }
});

app.use('/journey/save/', (req,res)=>{
    console.log("Saved");
    res.send({"status":"ok"})
});
app.use('/journey/publish/',(req,res)=>{
    console.log("Published");
    res.send({"status":"ok"})
});
app.use('/journey/validate/',(req,res)=>{
    console.log("Validation complete");
    res.send({"status":"ok"})
});


app.listen( port, () => console.log( `App listening on port ${port}!`) )
