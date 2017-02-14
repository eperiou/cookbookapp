angular.module('myApp.requests',[])
.factory('Recipes', function ($http) {
    var getAll = function() {
        console.log('caling getall');
        return $http({
            method: 'GET',
            url: '/recipes'
        }).then(function(resp) {
            console.log(resp);
            return resp.data;
        });
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

    return {
        getAll: getAll,
        addRecipe: addRecipe
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
