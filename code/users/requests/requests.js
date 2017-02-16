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
    var searchRecipe = function(query) {
        return $http({
            method: 'GET',
            url: '/search' ,
            header:['Access-Control-Allow-Origin',true],
            params:{key: 'string',
                q:query.param,
                sort: 'sort=t'
            }
        }).then(function(resp) {
            console.log(resp, 'search response');
            return resp;
        }).catch(function (err) { console.log(err); });
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
    var findQueryById = function (recipeid) {
        return $http({
            method: 'GET',
            url: '/search'  ,
            params:{key: 'string',
                rId:recipeid,
            }
        }).then(function(resp) {
            console.log(resp, 'query by id response');
            return resp;
        }).catch(function (err) { console.log(err); });
    };
    ///make API call to food 2fork for new recipes

    return {
        getAll: getAll,
        addRecipe: addRecipe,
        searchRecipe: searchRecipe,
        findQueryById: findQueryById
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



    return {
        signin: signin,
        signup: signup,
    };
});
