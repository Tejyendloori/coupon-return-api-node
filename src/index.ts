import * as denv from 'dotenv';
denv.config();
import fastify, {FastifyInstance} from 'fastify';
import {Server, IncomingMessage, ServerResponse} from 'http';
import {JWT} from 'google-auth-library';
var express = require( 'express' )
var nodeapp = express()
const JWT_decoder = require('../public/jwtDecode');
const https = require('https');
global.TextEncoder = require("util").TextEncoder;
const bodyParser = require('body-parser');
const { response } = require('express');
nodeapp.use(bodyParser.raw({
    type: 'application/jwt',
}));
nodeapp.use( express.static('public') )
// nodeapp.use(bodyParser.json()); // local fun

export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({logger: true});
const port = process.env.PORT || 3000;
const clientEmail: string = process.env.CLIENT_EMAIL || '';
const privateKey: string = process.env.PRIVATE_KEY || '';

const cloudFunctionEndpoint: string = `https://asia-south1-pvr-data-project.cloudfunctions.net/dynamic_voucher_jb`;
// const cloudFunctionEndpoint: string = `https://asia-south1-pvr-data-project.cloudfunctions.net/cloudfn_nodeinvoke`;


/**
 * 1. Define a GET endpoint with the url "/ping"
 */
 nodeapp.use('/journey/execute/', async (request:any, reply:any) => {
    console.log("Execution Starts");
    const url: string = cloudFunctionEndpoint;
    if (!clientEmail || ! privateKey) {
        reply
            .status(500)
            .send(`Make sure that the 'CLIENT_EMAIL' and 'PRIVATE_KEY' environment variables exists!!!`);
        return;
    }
    const clientjwt = new JWT({
        email: clientEmail,
        key: privateKey,
    });
    const token = await clientjwt.fetchIdToken(url);
    console.log("token generated successfully -", token)
    const headers = new Map([
        ['Authorization', `Bearer ${token}`],
    ]);
    let inputData  = JWT_decoder(request.body.toString())
    // let inputData  = request.body //JWT_decoder(request.body.toString())
    console.log ("Got Input ", inputData)
    if(inputData && inputData['inArguments'] && inputData['inArguments'].length>0){
        let couponInput = inputData['inArguments'][0];
        console.log("coupon input", couponInput)
        // const data = new TextEncoder().encode(
        //     JSON.stringify(couponInput)
        // )
        console.log("sending to static function now")
        clientjwt
            .request({url, headers ,method:"POST", data: JSON.stringify(couponInput)});
    
        // 7. Return the status and payload of the Cloud Function
        reply.send({
            status: 200
        });
        console.log("response has sent.. should not be print")
    } else {
        reply.send({'status':'failed'})
    }
});

nodeapp.use('/journey/execute/archived',(request:any,response:any)=>{
    console.log("Execution Starts");
    let inputData  = JWT_decoder(request.body.toString())
    if(inputData && inputData['inArguments'] && inputData['inArguments'].length>0){
        let couponInput = inputData['inArguments'][0];
        let inputForCoupon:any = {};
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
        const req = https.request(options, (res:any) => {
            let str = ''
            res.on('data', (chunk:any) =>{
                str += chunk;
            });
            res.on('end', function () { 
                console.log("Third Part API has completed. Returning coupon is  ", str)
                response.send({code:str})
            });
        })
        req.on('error', (error:any) => {
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

nodeapp.use('/journey/save/', (req:any,res:any)=>{
    console.log("Saved");
    res.send({"status":"ok"})
});
nodeapp.use('/journey/publish/',(req:any,res:any)=>{
    console.log("Published");
    res.send({"status":"ok"})
});
nodeapp.use('/journey/validate/',(req:any,res:any)=>{
    console.log("Validation complete");
    res.send({"status":"ok"})
});


nodeapp.listen( port, () => console.log( `App listening on port ${port}!`) )

/**
 * 1. Define a GET endpoint with the url "/ping"
 */
 nodeapp.use('/ping', async (request:any, reply:any) => {
    // Just rename global variable for ease of use
    const url: string = cloudFunctionEndpoint;

    // 2. Check if clientEmail and privateKey exists, otherwise auth is not possible
    if (!clientEmail || ! privateKey) {
        reply
            .status(500)
            .send(`Make sure that the 'CLIENT_EMAIL' and 'PRIVATE_KEY' environment variables exists!!!`);
        return;
    }

    // 3. Create JWT using the email and the private key from the Environment variables
    const clientjwt = new JWT({
        email: clientEmail,
        key: privateKey,
    });

    // 4. Fetch Bearer token for further authorization
    const token = await clientjwt.fetchIdToken(url);

    // 5. Set Bearer token to the header map
    // A simple JSON doesn't seem to work with the library, even though underlying typings tell so
    const headers = new Map([
        ['Authorization', `Bearer ${token}`],
    ]);

    // 6. Do the Actual request to the Cloud Function
    const result = await clientjwt
        .request({url, headers ,method:"POST", data: {"sample":"sample"}});

    // 7. Return the status and payload of the Cloud Function
    reply.send({
        status: result.status,
        body: result.data,
    });
});