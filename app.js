var express = require( 'express' )
var app = express()
const JWT = require('./public/jwtDecode');
const https = require('https');
global.TextEncoder = require("util").TextEncoder;
// const {GoogleAuth} = require('google-auth-library');
// const auth = new GoogleAuth();
// const serviceURL = "https://asia-south1-pvr-data-project.cloudfunctions.net/testfn"

// const projectId = "pvr-data-project"
// const keyFilename = 'pvr-forsfmc-appengcloudfnbqpubsub-fa67f02deda2.json'

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
// app.use("/tes",(request,response)=>{
//     const {URL} = require('url');
//     let targetAudience = new URL(serviceURL);
//     console.info(`request ${serviceURL} with target audience ${targetAudience}`);
//     console.log("before call inside fun")

//     fun1(auth, targetAudience)
//     console.log("after call inside fun")
// response.send(
//     {status:00}
// )
// })
// async function fun1(auth, targetAudience){
//     console.log("call inside fun")
//    const client = await auth.getIdTokenClient(targetAudience);
//    const res = await client.request({serviceURL});
//    console.info(res.data);

   
// }

app.use('/test', (request,response)=>{
    // https://asia-south1-pvr-data-project.cloudfunctions.net/cloudfn_nodeinvoke
    let inputForCoupon = {};
    inputForCoupon['TransId']  = "12345"
    const data = new TextEncoder().encode(
        JSON.stringify(inputForCoupon)
    )
    const options = {
        hostname: 'asia-south1-pvr-data-project.cloudfunctions.net',
        port: 443,
        path: '/cloudfn_nodeinvoke',
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
})
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
