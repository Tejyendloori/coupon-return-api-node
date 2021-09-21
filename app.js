var express = require( 'express' )
var app = express()
const JWT = require('./public/jwtDecode');

var port = process.env.PORT || 3000
const bodyParser = require('body-parser');
app.use(bodyParser.raw({
    type: 'application/jwt',
  }));
app.use( express.static('public') )

app.use(bodyParser.raw({
  type: 'application/jwt',
}));
app.use('/journey/execute/',(req,res)=>{
    console.log("execute");
    console.log("execute");
    console.log(JWT(req.body.toString())) 
    console.log("execute");
    res.send({"status":"ok"})
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
