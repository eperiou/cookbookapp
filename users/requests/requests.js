angular.module('myApp.requests', [])
    .factory('Recipes', ['$http', '__env', ($http, __env) => {
        if (!__env) {
            __env = {
                apiUrl: "",
            }
        }
        const getAll = () => {
            console.log('getall RECIPEs', __env.apiUrl)
            return $http.get(`${__env.apiUrl}/getrecipes`)
                .then(resp => resp.data)
                .catch(err => console.log(err));
        }

        const searchRecipe = query =>
            $http({
                method: 'GET',
                url: `${__env.apiUrl}/search`,
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
                url: `${__env.apiUrl}/postrecipes`,
                data: recipe,
            })
            .then(resp => resp)
            .catch(err => console.log(err));

        const findQueryById = recipeid =>
            $http({
                method: 'GET',
                url: `${__env.apiUrl}/search`,
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
    }]).factory('Auth', ['$http', '__env', ($http) => {
        const signin = user =>
            $http({
                method: 'POST',
                url: `${__env.apiUrl}/signin`,
                data: user,
            })
            .then(resp => resp.data)
            .catch(error => console.error(error));

        const signup = user =>
            $http({
                method: 'POST',
                url: `${__env.apiUrl}/signup`,
                data: user,
            })
            .then(resp => resp.data)
            .catch(error => console.error(error));
        return {
            signin,
            signup,
        };
    }]);