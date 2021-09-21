var express = require( 'express' )
var app = express()
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
    res.send({"status":"ok"})
});
app.use('/journey/save/', (req,res)=>{
    console.log("save");
    console.log(req.body)
    console.log(req.body.toString()) 
    res.send({"status":"ok"})
});
app.use('/journey/publish/',(req,res)=>{
    console.log("publish");
    res.send({"status":"ok"})
});
app.use('/journey/validate/',(req,res)=>{
    console.log("validate");
    res.send({"status":"ok"})
});

app.listen( port, () => console.log( `App listening on port ${port}!`) )
