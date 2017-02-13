const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
const MongoClient = require('mongodb').MongoClient
//mongo db for sandbox environment
var db;
MongoClient.connect('mongodb://eperiou:Tsukiyomi55@ds149329.mlab.com:49329/ezpz', (err, database) => {
  console.log('Mongodb connected');
  app.listen(3000,function () {console.log('server connected');});
  if(err) {console.log(err);}
  else {
    db = database;
  }
})






// make routes, post recipe, get recipes, search database
app.get('/recipes', (req,res)=>{
  //render user recipes
});


app.post('/signup',(req,res)=>{
  db.collection('users').save(req.body,(err,result)=>{
    if (err) { console.log(err);
    } else {
      console.log('user added to database')
      res.redirect('/')
    }
  })

});
app.post('/signin', (req,res)=>{
  console.log(req.body);
});




///server startup stuff;

app.get('/', function (req, res){res.sendFile(__dirname + '/signin.html')});
