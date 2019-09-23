import navbarTemplate from './navbar.html';
angular
    .module('myApp.navbar',[])
    .directive('navbar',['authService',
        function () {
            function navbarController(authService) {
                var vm = this;
                vm.auth = authService;
            }
        
            return {
                template: navbarTemplate,
                controller: navbarController,
                controllerAs: 'vm'
            };
        }
    ]);
    


    

