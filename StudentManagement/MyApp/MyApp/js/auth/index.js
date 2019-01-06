// Create the module where our functionality can attach to
let authModule = angular.module('app.auth', []);

// Include our UI-Router config settings
let AuthConfig = import('./auth.config.js');
authModule.config(function () { AuthConfig });

// Include controllers
let AuthCtrl = import('./auth.controller.js');
authModule.controller('AuthCtrl', AuthCtrl);

authModule;