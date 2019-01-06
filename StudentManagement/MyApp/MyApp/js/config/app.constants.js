(function () {
    'use strict';
    angular
        .module('helloApp')
        .constant('AppConstants', AppConstants);
        //.constant('AppConstants', {
        //    api : 'http://localhost/Backend/',
        //    jwtKey : 'jwtToken',
        //    appName : 'School Management'
        //});

    function AppConstants () {
        api = 'http://localhost/Backend/';
        jwtKey = 'jwtToken';
        appName = 'School Management';
    };
})();