var  angular = require('../bower_components/angular/index');
var  angularRoute = require('../bower_components/angular-route/index');
var jquery = require('../bower_components/jquery/dist/jquery');
var  bootstrap = require('../bower_components/bootstrap4/dist/js/bootstrap.bundle.js');
var bootstrapStylev = require('../bower_components/bootstrap4/dist/css/bootstrap.css');
var recipes = require('./recipes/recipescontroller');
var requests = require('./requests/requests');
var requests = require('./signup/signupcontroller');
var signupTemplate = require('./signup/signup.html');
var signinTemplate = require('./signup/signin.html');
var recipeTemplate = require('./recipes/recipes.html');
var style = require('./styles/style.css');

angular.module('myApp', ['ngRoute',
    'myApp.recipes',
    'myApp.requests',
    'myApp.signup'

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
