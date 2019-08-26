var angular = require('angular');
var angularRoute = require('angular-route');
var jquery = require('jquery');
var bootstrap = require('../bower_components/bootstrap4/dist/js/bootstrap.bundle.js');
var bootstrapStylev = require('../bower_components/bootstrap4/dist/css/bootstrap.css');
var recipes = require('./recipes/recipescontroller');
var requests = require('./requests/requests');
var requests = require('./signup/signupcontroller');
var signupTemplate = require('./signup/signup.html');
var signinTemplate = require('./signup/signin.html');
var recipeTemplate = require('./recipes/recipes.html');
var auth0 = require('../bower_components/auth0.js/build/auth0');
var angularauth = require('../bower_components/angular-auth0/src/index');
var style = require('./styles/style.css');

angular.module('myApp', ['ngRoute',
    'myApp.recipes',
    'myApp.requests',
    'myApp.signup',
    'auth0.auth0'

])
.config(['$routeProvider', function($routeProvider,$httpProvider) {
    $routeProvider.
    when('/', {
        template: signinTemplate,
        controller: 'SigninController'
    })
    .when('/signup', {
        template: signupTemplate,
        controller: 'SignupController'
    })
    .when('/recipes',{
        template: recipeTemplate,
        controller: 'RecipesController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
