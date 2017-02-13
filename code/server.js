const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let db;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

  //  mongo db for sandbox environment

MongoClient.connect('mongodb://eperiou:Tsukiyomi55@ds149329.mlab.com:49329/ezpz', (err, database) => {
    console.log('Mongodb connected');
    app.listen(3000, function () { console.log('server connected'); });
    if (err) {
        console.log(err);
    } else {
        db = database;
    }
});

// // make routes, post recipe, get recipes, search database
// app.get('/recipes', (req, res) => {
//   //render user recipes
// });


app.post('/signup', (req, res) => {
    console.log('signup');
    console.log(req.body);
    db.collection('users').save(req.body, (err, result) => {
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
    console.log(req.body);
});

//  server startup code;
app.get('/signin',function(req,res) { res.sendFile( __dirname + '/users/signin.html');});
app.get('/signup',function(req,res) { res.sendFile( __dirname + '/users/signup.html');});
app.get('/', function(req, res) { res.sendFile( __dirname + '/users/signup.html'); });
