angular.module('myApp.requests')
.factory('Recipes', function ($http) {
  // console.log($http);
    var getAll = function() {
        return $http({
            method: 'GET',
            url: '/recipes'
        }).then(function(resp) {
            console.log(resp);
            return resp.data;
        });
    };
    var addRecipe = function(recipe) {
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
        addRecip: addRecipe
    };
});
