angular.module('myApp', ['ngRoute',
    'myApp.recipes',
    'myApp.requests'

])
.config(['$routeProvider', function($routeProvider,$httpProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'signin/signin.html',
        // controller: 'SigninController'
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
