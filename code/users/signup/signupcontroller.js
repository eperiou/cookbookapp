angular.module('myApp.signup', [])
    .controller('SignupController', ['$scope', '$location', 'Auth', ($scope, $location, Auth) => {
        $scope.data = {};
        $scope.user = {};
        $scope.data.recipes = [];

        $scope.signUp = () => {
            Auth.signup($scope.user)
                .then(() => {
                    $location.path('/signin');
                })
                .catch((err) => {
                    console.error(err);
                    $location.path('/');
                });
        };

        $scope.signin = () => {
            Auth.signin($scope.user)
                .then((password) => {
                    console.log(password);
                    $location.path('/recipes');
                })
                .catch((err) => {
                    console.error(err);
                    $location.path('/');
                });
        };
    }]);