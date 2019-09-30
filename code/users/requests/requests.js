angular.module('myApp.requests', [])
    .factory('Recipes', ($http) => {
        const getAll = () => $http.get('/getrecipes').then(resp => resp.data)
            .catch(err => console.log(err));

        const searchRecipe = query =>
            $http({
                method: 'GET',
                url: '/search',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                params: {
                    q: query.param,
                    sort: 'sort=t',
                },
            }).then(resp => resp)
            .catch(err => console.error(err));


        const addRecipe = recipe =>
            $http({
                method: 'POST',
                url: '/postrecipes',
                data: recipe,
            })
            .then(resp => resp)
            .catch(err => console.log(err));

        const findQueryById = recipeid =>
            $http({
                method: 'GET',
                url: '/search',
                params: {
                    rId: recipeid,
                },
            })
            .then(resp => resp)
            .catch(err => console.error(err));

        // /make API call to food 2fork for new recipes

        return {
            getAll,
            addRecipe,
            searchRecipe,
            findQueryById,
        };
    }).factory('Auth', ($http, $location, $window) => {
        const signin = user =>
            $http({
                method: 'POST',
                url: '/signin',
                data: user,
            })
            .then(resp => resp.data)
            .catch(error => console.error(error));

        const signup = user =>
            $http({
                method: 'POST',
                url: '/signup',
                data: user,
            })
            .then(resp => resp.data)
            .catch(error => console.error(error));
        return {
            signin,
            signup,
        };
    });