angular.module('myApp.authService',[])
    .factory('authService',['angularAuth0','$timeout',
    function( angularAuth0, $timeout) {
        var accessToken;
        var idToken;
        var expiresAt;
    
        function getIdToken() {
            return idToken;
        }
    
        function getAccessToken() {
            return accessToken;
        }
    
        function login() {
            angularAuth0.authorize();
        }
        
        return {
            login: login,
            getIdToken: getIdToken,
            getAccessToken: getAccessToken,
        };
    }
]);
