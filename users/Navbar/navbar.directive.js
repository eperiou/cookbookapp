var navbarTemplate = require('./navbar.html');
angular
    .module('myApp.navbar', [])
    .controller("NavBar", ['$scope', 'authService', function($scope, authService) {
        $scope.auth = authService;
        console.log(authService);
    }])
    .directive('navBar', function() {
        return {
            template: navbarTemplate
        };
    });