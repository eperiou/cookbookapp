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
        console.log('calling get one', recipe);
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
