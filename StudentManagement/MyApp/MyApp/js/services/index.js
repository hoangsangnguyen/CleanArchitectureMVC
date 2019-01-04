// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

let UserService = import('./user.service.js');
servicesModule.service('User', UserService);

let JwtService = import('./jwt.service.js');
servicesModule.service('JWT', JwtService);

