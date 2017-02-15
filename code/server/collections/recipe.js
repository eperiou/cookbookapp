//setup user and database schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var RecipeSchema = new Schema({
    title:  String,
    user: String,
    ingredients:   String,
    comments: String,

});

///add methods


var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
