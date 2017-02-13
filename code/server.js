const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('link-to-mongodb', (err, database) => {
  // ... start the server
})






// make routes, post recipe, get recipes, search database
app.get('/recipes',function(req,res){
  //render user recipes
});


app.post('/signup',function(req,res){
  console.log(req.body);
});
app.post('/signin',function(req,res){
  console.log(req.body);
});




///server startup stuff;

app.get('/', function (req, res){res.sendFile(__dirname + '/signin.html')});
app.listen(3000,function (){console.log('server connected');});
