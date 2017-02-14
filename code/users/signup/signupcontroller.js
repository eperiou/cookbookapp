angular.module('myApp.signup', [])
.controller('SignupController', function ($scope, $location, Recipes, Auth) {
    console.log('signupcontroller');
    $scope.data = {};

    $scope.data.recipes = [];

//need a function to get all recipes
    $scope.signUp =function () {
        Auth.signup($scope.user)
        .then(function (user) {
            console.log(user);
            $location.path('/signin');
            // $scope.data.recipes = recipes;
        })
        .catch(function(err){
            console.log(err);
        });
    };


//need a function to add one
    $scope.signin = function () {
        console.log('signincontroller callad');
        Auth.signin($scope.user)
            .then(function(user) {
                $location.path('/recipe');
                console.log(user);
            })
            .catch(function(err) {
                $location.path('/signin');
                console.log(err);
            });
    };

});
