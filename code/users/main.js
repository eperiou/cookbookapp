angular.module('myApp', ['ngRoute',
    'myApp.recipes',
    'myApp.requests',
    'myApp.signup'

])
.config(['$routeProvider', function($routeProvider,$httpProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'signup/signin.html',
        controller: 'SignupController'
    })
    .when('/signup', {
        templateUrl: 'signup/signup.html',
        controller: 'SignupController'
    })
    .when('/recipes',{
        templateUrl: 'recipes/recipes.html',
        controller: 'RecipesController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
