<<<<<<< HEAD
﻿(function () {
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
=======
﻿const AppConstants = {
    api: 'http://localhost/Backend/',
    jwtKey: 'jwtToken',
    appName: 'School Management'
};

export default AppConstants;
>>>>>>> 0a9a0109244b9850d7aa04f08ba85e6791359475
