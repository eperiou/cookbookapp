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

const app = angular.module('myApp', ['ngRoute',
    'myApp.recipes',
    'myApp.requests',
    'myApp.signup'

])
.config(['$routeProvider', function($routeProvider,$httpProvider) {
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