angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'signin/signin.html',
        // controller: 'SigninController'
    })
    .when('/signup', {
        templateUrl: 'signup/signup.html',
        // controller: 'SignupController'
    })
    .when('/recipes',{
        templateUrl: '/recipes.html',
        // controller: 'SignupController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
