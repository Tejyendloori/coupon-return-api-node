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
app.get("/journeybuilder/execute", (request,response)=>{
  console.log("get request")
  response.send({code:"sampleget"})
} )
app.post("/journeybuilder/execute", (request,response)=>{
  console.log("post request")
  response.send({code:"sample post"})
} )
app.post("/journeybuilder/publish", (request,response)=>{
  console.log("publish request")
  response.send({code:"sample publish"})
} )
app.post("/journeybuilder/validate ", (request,response)=>{
  console.log("validate  request")
  response.send({code:"sample validate "})
} )
app.post("/journeybuilder/save ", (request,response)=>{
  console.log("save  request")
  response.send({code:"sample save "})
} )
/* dinesh code starts here */

app.listen( port, () => console.log( `App listening on port ${port}!`) )
