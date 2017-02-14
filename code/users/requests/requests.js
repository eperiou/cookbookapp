// var keys = require('keys');
// console.log(keys,'key');
angular.module('myApp.requests',[])
.factory('Recipes', function ($http) {
    var getAll = function() {
        console.log('caling getall');
        return $http({
            method: 'GET',
            url: '/recipes'
        }).then(function(resp) {
            console.log(resp,'response');
            return resp.data;
        }).catch(err=>console.log('getallerror',err));
    };
    var addRecipe = function(recipe) {
        console.log('calling add one', recipe);
        return $http({
            method: 'POST',
            url: '/recipes',
            data: recipe
        }).then(function(resp) {
            console.log(resp, 'post response');
            return resp;
        }).catch(function (err) { console.log(err); });
    };

    ///make API call to food 2fork for new recipes
    var searchRecipe = function(query) {
        console.log('calling search', query);


        return $http({
            method: 'GET',
            url: 'http://food2fork.com/api/search',
            params:{ key: window.API_KEY,
                sort: 'sort=t',
                q:query.param
            }
        }).then(function(resp) {
            console.log(resp, 'search response');
            return resp;
        }).catch(function (err) { console.log(err); });
    };
    return {
        getAll: getAll,
        addRecipe: addRecipe,
        searchRecipe: searchRecipe
    };
}).factory('Auth', function ($http, $location, $window) {
    var signin = function (user) {
        console.log(user);
        return $http({
            method: 'POST',
            url: '/signin',
            data: user
        })
    .then(function (resp) {
        console.log('signinresponse',resp.data);
        return resp.data;
    });
    };

    var signup = function (user) {
        return $http({
            method: 'POST',
            url: '/signup',
            data: user
        })
        .then(function (resp) {
            console.log(resp,'usersignup response');
            return resp.data;
        });
    };

    // var isAuth = function () {
    //     return !!$window.localStorage.getItem('com.shortly');
    // };
    //
    // var signout = function () {
    //     $window.localStorage.removeItem('com.shortly');
    //     $location.path('/signin');
    // };


    return {
        signin: signin,
        signup: signup,
        // isAuth: isAuth,
        // signout: signout
    };
});
