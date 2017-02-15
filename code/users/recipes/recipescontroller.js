angular.module('myApp.recipes', [])
.controller('RecipesController', function ($scope,Recipes) {
    console.log('myapp module');
    $scope.data = {};
    $scope.data.recipes = [];
    $scope.ingredientlist ={};
    $scope.ingredientlist.ingredients = [];
    $scope.search = {};
    $scope.search.results = [];

//need a function to get all recipes
//route to retrieve all stored recipes
/**
 * Returns the recipes from database
 * @param  return value, then, promise statemnt of all recipes
 * @param eror handling function
 * @param sets global array of recipes for display
 */
    $scope.getRecipes =function () {
        Recipes.getAll()
        .then(function (recipes) {
            // console.log(recipes,'recipes gotten');
            $scope.data.recipes = recipes;
        })
        .catch(function(err){
            console.log(err);
        });
    };

  /**
   * Adds ingredient list to grocery list
   * @param  no return
   * @param
   * @param sets global array of recipes for display
   */

    $scope.addingredient = function (ingredient) {

        $scope.ingredientlist.ingredients.push(ingredient);
    };
//need a function to add one
/**
 *
 *  no return
 * Adds one recipe to the database
 * @param
 */


    $scope.addOne = function () {
        console.log($scope.user,'scope recipe');
        $scope.data.recipes.unshift($scope.recipe);
        Recipes.addRecipe($scope.recipe);
    };



    /**
     * Adds ingredient list to grocery list
     * @param  Search f2f for list of foods
     * @param  poulates page with recipes from online
     * @param
     */

    $scope.search = function () {
        // console.log('search',$scope.query);
        $scope.data.recipes = [];
        Recipes.searchRecipe($scope.query)
            .then(function(results) {
                $scope.search.results = results.data.recipes;
            })
            .catch(function(err) {
                console.log(err);
            });
    };




        /**
         * Searches database for food by id number
         * @param  Search f2f by food item
         * @param  adds ingredients to grocery list
         * @param  adds recipe to database
         */

    $scope.getingredients = function (recipeid) {
        // console.log(recipeid,'recipeid');
        Recipes.findQueryById(recipeid)
            .then(function(result) {
                console.log(result,'getingredients request');

        //add ingredients to the grocery list
                $scope.ingredientlist.ingredients =
                    $scope.ingredientlist.ingredients.concat(result.data.recipe.ingredients);



        //add recipe to the stored recipes database.
                var recipeObj = {
                    title: result.data.recipe.title,
                    ingredients:result.data.recipe.ingredients,
                    user: result.data.recipe.publisher,
                };
                Recipes.addRecipe(recipeObj);
            })
            .catch(function(err){
                console.log(err,'error retrieving by ID');
            });
    };

});
