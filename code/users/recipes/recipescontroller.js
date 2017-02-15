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

});
