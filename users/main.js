var angular = require('../bower_components/angular/index');
var angularRoute = require('../bower_components/angular-route/index');
var jquery = require('../bower_components/jquery/dist/jquery');
var bootstrap = require('../bower_components/bootstrap4/dist/js/bootstrap.bundle.js');
var bootstrapStylev = require('../bower_components/bootstrap4/dist/css/bootstrap.css');


var recipes = require('./recipes/recipescontroller');
var requests = require('./requests/requests');
var callbacks = require('./Callback/callbackcontroller');
var navbar = require('./Navbar/navbar.directive');

var splashPage = require("./signup/splashpage.html");
var recipeTemplate = require('./recipes/recipes.html');
var makeARecipeTemplate = require("./MakeARecipe/makearecipe.html");
var findInspirationTemplate = require("./findInspiration/findInspiration.html");
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
                template: splashPage,
                controller: 'NavBar'
            })

        .when('/makeARecipe', {
                template: makeARecipeTemplate,
                controller: 'RecipesController'

            })
            .when('/findInspiration', {
                template: findInspirationTemplate,
                controller: 'RecipesController'

            })
            .when('/callback', {
                template: callbackTemplate,
                controller: 'CallBackController'
            })
            .when('/recipes', {
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
            redirectUri: `https://easy-recipe-book.herokuapp.com//#/callback`,
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

        if (next.controller != "NavBar") {
            if (!authService.isAuthenticated()) {
                console.log('denied', event);
                event.preventDefault();
                $location.path('/');
            }
        }
    })
}]);