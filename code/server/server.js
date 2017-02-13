const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const User = require('./collections/User.js');

let db;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

  //  mongo db for sandbox environment

mongoose.connect('mongodb://eperiou:Tsukiyomi55@ds149329.mlab.com:49329/ezpz', (err, database) => {
    console.log('Mongodb connected');
    app.listen(3000, function () { console.log('server connected'); });
    if (err) {
        console.log(err);
    } else {
        db = database;
    }
});

// make routes, post recipe, get recipes, search database
app.get('/recipes', (req, res) => {


    ///add new recipe
    new Recipe({ }).save(req.body, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log('user added to database');
            res.redirect('/');
        }
    });
  //render user recipes
});


app.post('/signup', (req, res) => {
    new User({username:req.body.username,password:req.body.password}).save(req.body, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log('user added to database');
            res.redirect('/');
        }
    });
});



app.post('/signin', (req, res) => {
    console.log('signin');
    User.findOne({username:req.body.username},'password', (err, password)=>{
        if (err) {
            console.log(err);
        } else {
            ///Spot for future validations;
            console.log(password);
        }
    });

});

//  server startup code;
app.get('/signin',function(req,res) { res.sendFile( __dirname + '../../users/signin.html');});
app.get('/signup',function(req,res) { res.sendFile( __dirname + '../../users/signup.html');});
app.get('/', function(req, res) { res.sendFile( __dirname + '../../users/signup.html'); });
