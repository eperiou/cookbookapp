const Recipe = require('../collections/recipe.js');
const Q = require('q');
let findRecipe = Q.nbind(Recipe.find, Recipe);
const rp = require('request-promise');
module.exports = {
    postRecipe(req, res, next) {
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
    },
    //route to retrieve all stored recipes
    /**
     * Returns the recipes from database
     * @param req, request body
     * @param res, response body
     * @param will return object of recpie array
     */
    getAllRecipes(req, res) {
        findRecipe({})
            .then((recipes) => {
                res.send(recipes);
            })
            .catch((err) => { res.send(err); });
    },
    searchRecipe(req, res, next) {
        if (req.query.rId) { next(); }
        rp({
                url: `http://food2fork.com/api/search?key=${process.env.KEY}`,
                method: 'GET',
                qs: req.query
            })
            .then(search => res.send(search))
            .catch(error => res.send(error));
    },
    searchFood2Fork(req, res, next) {
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
    }
}