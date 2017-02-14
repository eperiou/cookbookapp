angular.module('myApp.recipes', [])
.controller('RecipesController', function ($scope) {
    $scope.data = {};
    //need a function to get all recipes
    $scope.data.recipes = [];
    //need a function to add one


    $scope.getRecipes =function () {
        Recipes.getAll()
        .then(function (recipes) {
            $scope.data.recipes = recipes;
        })
        .catch(function(err){
            console.log(err);
        });
    };

    $scope.addOne = function () {
        Recipes.addRecipe()
            .then(function(recipe) {

            })
            .catch(function(err) {
                console.log(err);
            });
    };

});
