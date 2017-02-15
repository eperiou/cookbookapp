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

    $scope.addingredient = function (ingredient) {
        console.log('click',ingredient);
        $scope.ingredientlist.ingredients.push(ingredient);
    };
//need a function to add one
    $scope.addOne = function () {
        console.log($scope.user,'scope recipe');
        Recipes.addRecipe($scope.recipe);
    };

    $scope.search = function () {
        // console.log('search',$scope.query);
        $scope.data.recipes = [];
        Recipes.searchRecipe($scope.query)
            .then(function(results) {
                $scope.search.results = results.data.recipes;
                console.log($scope.search.results, 'search in controller');
            })
            .catch(function(err) {
                console.log(err);
            });
    };
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
