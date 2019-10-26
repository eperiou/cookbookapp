// 'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const http = require('http');
let db;
const app = express();
const router = express.Router();
const cors = require('cors');
const recipeMiddleware = require('./Middleware/recipesroutes');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(), cors());
require('dotenv').config();
const Q = require('q');
const mongoPromise = Q.bind(mongoose.connect, process.env.MONGOURI, { useNewUrlParser: true })


// load static assets
app.use(express.static(path.join(__dirname + '/../dist')));

router.post('/postrecipes', recipeMiddleware.postRecipe);

router.options('/getrecipes', cors());
router.get('/getrecipes', recipeMiddleware.getAllRecipes);

router.options('/search', cors());
router.get('/search', recipeMiddleware.searchRecipe, recipeMiddleware.searchFood2Fork);

app.use(router);
//  mongo db for sandbox environment

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true })
    .then(() => app.listen(process.env.PORT,
        () => console.log('server connected on2 ' + process.env.PORT)))
    .catch(console.log)