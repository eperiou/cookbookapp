// 'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const User = require('./collections/User.js');
const Recipe = require('./collections/recipe.js');
const path = require('path');
const rp = require('request-promise');
const http = require('http');
let db;
const Q = require('q');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();
let findRecipe = Q.nbind(Recipe.find, Recipe);

  //  mongo db for sandbox environment

mongoose.connect(process.env.MONGOURI, (err, database) => {
    app.listen(process.env.PORT, function () { console.log('server connected on ' +  process.env.PORT); });
    if (err) {
        console.log(err);
    } else {
        db = database;
    }
});

//route to retrieve all stored recipes
app.use(express.static(path.join(__dirname +'/../users')));

// make routes, post recipe, get recipes, search database
app.post('/recipes', (req, res) => {
    new Recipe({ title: req.body.title,
        user: req.body.user,
        ingredients: req.body.ingredients,
        comments: req.body.comments}).save(req.body, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(('recipe added to database'));
            }
        });
});

//route to retrieve all stored recipes
/**
 * Returns the recipes from database
 * @param req, request body
 * @param res, response body
 * @param will return object of recpie array
 */

app.get('/recipes', (req, res) => {
    findRecipe({})
        .then((recipes) => { res.send(recipes); })
        .catch((err) => { res.send(err); });
});

//route to sign up new user
/**
 * Returns no value, redirects to base page
 * @param req, request body
 * @param res, response body
 * @param will return object of recpie array
 */

app.post('/signup', (req, res) => {
    new User({username:req.body.username, password:req.body.password}).save(req.body, (err, result) => {
        if (err) { console.error(err); }
        res.redirect('/');
    });
});
/**
 * Returns request body password from database
 * @param req, request body
 * @param res, response body
 * @param compares request password to password for input username
 *        and checks if valid, for later encryption
 */


app.post('/signin', (req, res) => {
    const findUser = Q.nbind(User.findOne, User);
    findUser({username:req.body.username},'password')
       .then((password)=>{
           if(req.body.password === password.password) {
               res.redirect('/recipes');
           }
       })
       .catch((err)=>{this.respond(err);});
});

app.get('/search', (req,res, next) =>{
    if(req.query.rId) { next();}
    rp({
        url: `http://food2fork.com/api/search?key=${process.env.KEY}`,
        method:'GET',
        qs:req.query
    })
    .then(search=>res.send(search))
    .catch(error=>res.send(error));
}, (req,res, next) => {
    rp({
        url: 'http://food2fork.com/api/get',
        method:'GET',
        headers:{
            'content-type': 'application/x-www-form-urlencoded',
        },
        qs:{
            rId: req.query.rId,
            key: process.env.KEY,
        }
    })
    .then(search=>{res.send(search);})
    .catch(error=> {res.send(error);});
});
