angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'signin.html',
        controller: 'SigningController'
    })
    .when('/signup', {
        templateUrl: 'signup.html',
        controller: 'SignupController'
    })
    .otherwise({
        redirectTo: '/'
    });
}])
;
