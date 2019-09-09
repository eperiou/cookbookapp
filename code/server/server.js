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
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();

let findRecipe = Q.nbind(Recipe.find, Recipe);
const findUser = Q.nbind(User.findOne, User);

// load static assets
app.use(express.static(path.join(__dirname + '/../dist')));

//route to retrieve all stored recipes
// make routes, post recipe, get recipes, search database
router.post('/recipes', (req, res) => {
    new Recipe({
        title: req.body.title,
        user: req.body.user,
        ingredients: req.body.ingredients,
        comments: req.body.comments
    }).save(req.body, (err, result) => {
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

router.get('/recipes', (req, res) => {
    console.log('recipes');
    findRecipe({})
        .then((recipes) => {
            console.log(recipes);
            res.send(recipes);
        })
        .catch((err) => { res.send(err); });
});

//route to sign up new user
/**
 * Returns no value, redirects to base page
 * @param req, request body
 * @param res, response body
 * @param will return object of recpie array
 */

router.post('/signup', (req, res) => {
    new User({ username: req.body.username, password: req.body.password }).save(req.body, (err, result) => {
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


router.post('/signin', (req, res) => {
    console.log(req.body.username);
    findUser({ username: req.body.username }, 'password')
        .then((password) => {
            if (req.body.password === password.password) {
                console.log('redirect');
                res.redirect('/recipes');
                res.send
            }
        })
        .catch((err) => {
            res.send(err)
            console.log(err);
        });
});

router.get('/search', (req, res, next) => {
    if (req.query.rId) { next(); }
    rp({
            url: `http://food2fork.com/api/search?key=${process.env.KEY}`,
            method: 'GET',
            qs: req.query
        })
        .then(search => res.send(search))
        .catch(error => res.send(error));
}, (req, res, next) => {
    rp({
            url: 'http://food2fork.com/api/get',
            method: 'GET',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            qs: {
                rId: req.query.rId,
                key: process.env.KEY,
            }
        })
        .then(search => { res.send(search); })
        .catch(error => { res.send(error); });
});

app.use(router);
//  mongo db for sandbox environment
mongoose.connect(process.env.MONGOURI, (err, database) => {
    if (err) {
        console.log(err);
    } else {
        db = database;
        app.listen(process.env.PORT, function() { console.log('server connected on ' + process.env.PORT); });
    }
});