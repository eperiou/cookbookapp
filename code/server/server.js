// 'use strict'
require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const User = require('./collections/User.js');
const Recipe = require('./collections/recipe.js');
const path = require('path');
const request = require('request');
const http = require('http');
let db;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

  //  mongo db for sandbox environment

mongoose.connect(process.env.MONGOURI, (err, database) => {
    console.log('Mongodb connected');
    app.listen(process.env.PORT, function () { console.log('server connected on ' + PORT); });
    if (err) {
        console.log(err);
    } else {
        db = database;
    }
});

//route to retrieve all stored recipes
/**setup express server and routes
 */
app.use(express.static(path.join(__dirname +'/../users')));

// make routes, post recipe, get recipes, search database
app.post('/recipes', (req, res) => {
    ///add new recipe
    console.log(req.body,'router /recipes');
    new Recipe({ title: req.body.title,
        user: req.body.user,
        ingredients: req.body.ingredients,
        comments: req.body.comments}).save(req.body, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('recipe added to database');
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
    Recipe.find({},(err,recipes)=>{
        if (err) {console.log(err); }
        console.log(recipes,'recipe');
        res.json(recipes);
        console.log('recipe retrieval');
    });
});

//route to sign up new user
/**
 * Returns no value, redirects to base page
 * @param req, request body
 * @param res, response body
 * @param will return object of recpie array
 */

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
/**
 * Returns request body password from database
 * @param req, request body
 * @param res, response body
 * @param compares request password to password for input username
 *        and checks if valid, for later encryption
 */


app.post('/signin', (req, res) => {
    console.log('signin',req.body);
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
