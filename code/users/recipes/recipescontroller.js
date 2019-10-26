angular.module('myApp.recipes', [])
    .controller('RecipesController', ['$scope', 'Recipes', '$location', function($scope, Recipes, $location) {
        $scope.data = {};
        $scope.data.recipes = [];
        $scope.ingredientlist = {};
        $scope.ingredientlist.ingredients = [];
        $scope.search = {};
        $scope.searchresults = [];

        //need a function to get all recipes
        //route to retrieve all stored recipes
        /**
         * Returns the recipes from database
         * @param  return value, then, promise statemnt of all recipes
         * @param eror handling function
         * @param sets global array of recipes for display
         */
        $scope.getRecipes = () => {
            console.log('getrecipes')
            Recipes.getAll()
                .then((recipes) => {
                    $scope.data.recipes = recipes;

                })
                .catch((err) => { console.error(err); });
        };

        /**
         * Adds ingredient list to grocery list
         * @param  no return
         * @param
         * @param sets global array of recipes for display
         */

        $scope.addingredient = (ingredient) => {
            $scope.ingredientlist.ingredients.push(ingredient);
        };
        /**
         *
         *  no return
         * Adds one recipe to the database
         * @param
         */
        $scope.addOne = () => {
            $scope.data.recipes.unshift($scope.recipe);
            Recipes.addRecipe($scope.recipe).then(data => $location.path('/recipes'));
        };

        /**
         * Adds ingredient list to grocery list
         * @param  Search f2f for list of foods
         * @param  poulates page with recipes from online
         * @param
         */

        $scope.search = () => {
            $scope.data.recipes = [];
            Recipes.searchRecipe($scope.query)
                .then((results) => {
                    $scope.searchresults = results.data.recipes;
                    console.log(results.data.recipes[0]);
                })
                .catch((err) => { console.error(err); });
        };

        /**
         * Searches database for food by id number
         * @param  Search f2f by food item
         * @param  adds ingredients to grocery list
         * @param  adds recipe to database
         */

        $scope.getingredients = (recipeid) => {
            Recipes.findQueryById(recipeid)
                .then((result) => {
                    //add ingredients to the grocery list
                    $scope.ingredientlist.ingredients =
                        $scope.ingredientlist.ingredients.concat(result.data.recipe.ingredients);
                    //add recipe to the stored recipes database.
                    let recipe = result.data.recipe
                    const recipeObj = {
                        title: recipe.title,
                        ingredients: recipe.ingredients,
                        user: recipe.publisher,
                    };
                    Recipes.addRecipe(recipeObj);
                }).then(() => $location.path('/recipes'))
                .catch((err) => { console.error(err, 'error retrieving by ID'); });
        };

    }]);