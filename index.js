var express = require('express');
var app = express();
app.get('/', (req, res)=> {
  res.setHeader('Content-Type', 'application/json');
  res.json({message:'Hello! The API is at ' + req.protocol + '://' + req.get('host')  + '/v2'});
});
var port = process.env.PORT || 8080; 
var server = app.listen(port,()=>{

  console.log(`Server is up on port:  ${port}`);
});
