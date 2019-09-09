angular.module('myApp.auth0Service',[])
    .factory('auth0Service',['$state', 'angularAuth0', '$timeout', authService ]);

var authService = function($state, angularAuth0, $timeout) {
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
    function handleAuthentication() {
        angularAuth0.parseHash(function(err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                localLogin(authResult);
                $state.go('home');
            } else if (err) {
                $timeout(function() {
                    $state.go('home');
                });
                console.log(err);
            }
        });
    }

    function localLogin(authResult) {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Set the time that the Access Token will expire at
        expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        accessToken = authResult.accessToken;
        idToken = authResult.idToken;
    }

    function renewTokens() {
        angularAuth0.checkSession({},
            function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    localLogin(result);
                }
            }
        );
    }

    function logout() {
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        // Remove tokens and expiry time
        accessToken = '';
        idToken = '';
        expiresAt = 0;

        angularAuth0.logout({
            returnTo: window.location.origin
        });

        $state.go('home');
    }

    function isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiresAt;
    }

    return {
        login: login,
        getIdToken: getIdToken,
        getAccessToken: getAccessToken,
        handleAuthentication: handleAuthentication,
        logout: logout,
        isAuthenticated: isAuthenticated,
        renewTokens: renewTokens
    };
};