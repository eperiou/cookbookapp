angular.module('myApp.signup', [])
.controller('SignupController', function ($scope, $location, Recipes, Auth) {

    $scope.data = {};
    $scope.user = {};

    $scope.data.recipes = [];

    $scope.signUp = () => {
        Auth.signup($scope.user)
        .then((user) => {
            $location.path('/signin');
        })
        .catch((err) => {
            console.error(err);
        });
    };

    $scope.signin =  () => {
        Auth.signin($scope.user)
            .then((password) => {
                $location.path('/recipes');
            })
            .catch((err) => {
                $location.path('/signin');
            });
    };

});
