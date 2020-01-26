(function(window) {
    window.__env = window.__env || {};

    // API url
    // For demo purposes we fetch from local file in this plunk
    // In your application this can be a url like https://api.github.com
    window.__env.apiUrl = 'http://localhost:3000';
    window.__env.hostURL = 'http://localhost:8080';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
}(this));