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
var auth0service = require('./Auth/authService');
var navbarDirective = require('./Navbar/navbar.directive');
var navbarTemplate = require('./Navbar/navbar.html');
var callback = require('./Callback/callback.controller');
var callbackTemplate = require('./Callback/callback.html');
var style = require('./styles/style.css');

const app = angular.module('myApp', ['ngRoute',
    'myApp.recipes',
    'myApp.requests',
    'myApp.signup',
    'auth0.auth0',
    'myApp.auth0Service',
    'myApp.auth0Directive',
    'myApp.callBackController'
]);
app.config(['$routeProvider','angularAuth0Provider','$locationProvider', function($routeProvider,angularAuth0Provider,$locationProvider) {
    $routeProvider.
    when('/', {
        template: signinTemplate,
        controller: 'SignupController'
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
    angularAuth0Provider.init({
        clientID: 'aPLDVs7W8qfgAPSpDDCKFUAPYbFnMmzR',
        domain: 'ezpz-lemonsqueezy.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:3000/callback',
        scope: 'openid'
    });
}]).run(['auth0Service',function(auth0Service){
    console.log(auth0Service);
}]);