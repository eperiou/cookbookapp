var styles = require('../styles/style.css');
var  angular = require("../bower_components/angular/index");
var  angularRoute = require("../bower_components/angular-route/index");
var jquery = require('../bower_components/jquery/dist/jquery');
var  bootstrap = require("../bower_components/bootstrap4/dist/js/bootstrap.bundle.js");
var bootstrapStylev = require("../bower_components/bootstrap4/dist/css/bootstrap.css");
var recipes = require('./recipes/recipescontroller');
var requests = require('./requests/requests');
var requests = require('./signup/signupcontroller');



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
