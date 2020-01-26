(function(window) {
    window.__env = window.__env || {};

    // API url
    // For demo purposes we fetch from local file in this plunk
    // In your application this can be a url like https://api.github.com
    window.__env.apiUrl = 'https://easy-recipe-book.herokuapp.com';
    window.__env.hostURL = 'https://easy-recipe-book.herokuapp.com';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
}(this));