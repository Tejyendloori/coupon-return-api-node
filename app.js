var express = require( 'express' )
const request = require('request');
var app = express()
var port = process.env.PORT || 3000
const https = require('https')


app.use( express.static('public') )
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
/* dinesh code starts here */
app.post("/test", (request, response)=>{

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
        res.on('data', d => {
         code =  process.stdout.write(d)
         response.send({"code":code, "d":d})
        })
      })
      req.on('error', error => {
        console.error(error)
        response.send({"code":""})
      })
      req.write(data)
      req.end()    
});
/* dinesh code starts here */

app.listen( port, () => console.log( `App listening on port ${port}!`) )
