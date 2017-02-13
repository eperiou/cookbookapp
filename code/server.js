const express = require('express');
const app = express();












app.get('/', function (req, res){
  res.sendFile(__dirname + '/signin.html')
  // res.send('we got connnections');
})


app.listen(3000,function (){
  console.log('server connected');
})
