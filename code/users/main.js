var angular = require('../bower_components/angular/index');
var angularRoute = require('../bower_components/angular-route/index');
var jquery = require('../bower_components/jquery/dist/jquery');
var bootstrap = require('../bower_components/bootstrap4/dist/js/bootstrap.bundle.js');
var bootstrapStylev = require('../bower_components/bootstrap4/dist/css/bootstrap.css');


var recipes = require('./recipes/recipescontroller');
var requests = require('./requests/requests');
var signupcontroller = require('./signup/signupcontroller');
var callbacks = require('./Callback/callbackcontroller');
var navbar = require('./Navbar/navbar.directive');

var signupTemplate = require('./signup/signup.html');
var signinTemplate = require('./signup/signin.html');
var recipeTemplate = require('./recipes/recipes.html');
var navbarTemplate = require('./Navbar/navbar.html');
var callbackTemplate = require('./Callback/callback.html');

var style = require('./styles/style.css');
var auth0 = require('../bower_components/auth0.js/src/index');
var authangular = require('../bower_components/angular-auth0/src/index');
var authService = require('./Auth/authService');
var env = {};
if (window) {
    Object.assign(env, window.__env);
}

const app = angular.module('myApp', ['ngRoute',
    'myApp.recipes',
    'myApp.requests',
    'myApp.signup',
    'auth0.auth0',
    'myApp.authService',
    'myApp.callBackController',
    'myApp.navbar'
]);
app.constant('__env', env);
app.config(['$routeProvider', 'angularAuth0Provider', '$locationProvider',
    function($routeProvider, angularAuth0Provider, $locationProvider) {
        $routeProvider
            .when('/', {
                template: signinTemplate,
                controller: 'SignupController'
            })
            .when('/signup', {
                template: signupTemplate,
                controller: 'SignupController'
            })
            .when('/recipes', {
                template: recipeTemplate,
                controller: 'RecipesController'

            })
            .when('/callback', {
                template: callbackTemplate,
                controller: 'CallBackController'
            })
            .otherwise({
                redirectTo: '/'
            });
        angularAuth0Provider.init({
            clientID: 'aPLDVs7W8qfgAPSpDDCKFUAPYbFnMmzR',
            domain: 'ezpz-lemonsqueezy.auth0.com',
            responseType: 'token id_token',
            redirectUri: `${env.hostURL}/#/callback`,
            scope: 'openid'
        });
        $locationProvider.hashPrefix('');
        //$locationProvider.html5Mode(true);
    }
]);
app.run(['authService', '$rootScope', '$location', function(authService, $rootScope, $location) {
    if (authService.isAuthenticated()) {
        authService.renewTokens();
    } else {
        authService.handleAuthentication();
    }
    $rootScope.$on('$routeChangeStart', function(event, next) {

        if (next.controller != "SignupController") {
            if (!authService.isAuthenticated()) {
                console.log('denied', event);
                event.preventDefault();
                $location.path('/');
            } else {
                console.log('allowed', event);
                $location.path('/recipes')
            }
        }
    })
}]);