angular.module('myApp.recipes', [])
.controller('RecipesController', function ($scope,Recipes) {
    console.log('myapp module');
    $scope.data = {};

    $scope.data.recipes = [];


//need a function to get all recipes
    $scope.getRecipes =function () {
        Recipes.getAll()
        .then(function (recipes) {
            console.log(recipes,'recipes gotten');
            $scope.data.recipes = recipes;
        })
        .catch(function(err){
            console.log(err);
        });
    };


//need a function to add one
    $scope.addOne = function () {
        console.log($scope.user,'scope recipe');
        Recipes.addRecipe($scope.recipe)
            .then(function(recipe) {

                console.log(recipe);
            })
            .catch(function(err) {
                console.log(err);
            });
    };

    $scope.search = function () {
        console.log('search',$scope.query);
        Recipes.searchRecipe($scope.query)
            .then(function(recipe) {
                
                console.log(recipe);
            })
            .catch(function(err) {
                console.log(err);
            });
    };

});
