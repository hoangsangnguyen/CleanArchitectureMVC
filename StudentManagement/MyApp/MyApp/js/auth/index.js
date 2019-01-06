// Create the module where our functionality can attach to
let authModule = angular.module('app.auth', []);

// Include our UI-Router config settings
let AuthConfig = import('./auth.config.js');
authModule.config(function () { AuthConfig });

// Include controllers
let AuthCtrl = import('./auth.controller.js');
authModule.controller('AuthCtrl', AuthCtrl);
<<<<<<< HEAD

authModule;
=======
>>>>>>> 0a9a0109244b9850d7aa04f08ba85e6791359475
