const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const User = require('./collections/User.js');
const Recipe = require('./collections/recipe.js');
const path = require('path');

let db;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.use(express.static(path.join(__dirname +'/../users')));

// make routes, post recipe, get recipes, search database
app.post('/recipes', (req, res) => {
    ///add new recipe
    console.log(req.body,'router /recipes');
    new Recipe({ title: req.body.title,
        ingredients: req.body.ingredients,
        comments: req.body.comments}).save(req.body, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('recipe added to database');
            }
        });
  //render user recipes
});

app.get('/recipes', (req, res) => {
    Recipe.find({},(err,recipes)=>{
        if (err) {console.log(err); }
        console.log(recipes,'recipe');
        res.json(recipes);
        console.log('recipe retrieval');
    });
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
                ///overly simple authentications
            if(req.body.password === password.password ){
                res.end(req.body.password);
            }
        }
    });
});

//  server startup code;
// app.get('/signin',function(req,res) { res.sendFile(path.join(__dirname , '../users/signin','/signin.html')); });
// app.get('/signup',function(req,res) { res.sendFile(path.join(__dirname , '../users/signup','signup.html'));});
// app.get('/', function(req, res) { res.sendFile( path.join(__dirname , '../users','/index.html')); });
