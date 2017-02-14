angular.module('myApp.recipes', [])
.controller('RecipesController', function ($scope,Recipes) {
    console.log('myapp module');
    $scope.data = {};

    $scope.data.recipes = [];


//need a function to get all recipes
    $scope.getRecipes =function () {
        Recipes.getAll()
        .then(function (recipes) {
            console.log(recipes);
            $scope.data.recipes = recipes;
        })
        .catch(function(err){
            console.log(err);
        });
    };


//need a function to add one
    $scope.addOne = function () {
        Recipes.addRecipe()
            .then(function(recipe) {
                console.log(recipe);
            })
            .catch(function(err) {
                console.log(err);
            });
    };

});
