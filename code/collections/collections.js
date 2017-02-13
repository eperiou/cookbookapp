//setup user and database schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:  String,
    password: String
});

var RecipeSchema = new Schema({
    title:  String,
    user: String,
    ingredients:   String,
    comments: String,
    // date: { type: Date, default: Date.now },
    // hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs:  Number
    // }
});

///add methods




module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Recipe', RecipeSchema);
