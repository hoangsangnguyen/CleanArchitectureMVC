/* global angular */
(function () {
    "use strict";
    // Declare app level module which depends on filters, and services
    var module = angular.module('helloApp', [
        'ngRoute',
        'helloApp.controllers',
        'navigation.controllers',
        'login.controllers',
        'departments.controllers',
        'class.controllers',
        'students.controllers',

    ]);

    module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', { templateUrl: '/partials/hello/hello.html', controller: 'helloCtrl' });
        $routeProvider.when('/view1', { templateUrl: '/partials/partial1.html' });
        $routeProvider.when('/view2', { templateUrl: '/partials/partial2.html' });
        $routeProvider.when('/auth/login', { templateUrl: '/partials/auth/login/index.html', controller: 'loginCtrl' });
        $routeProvider.when('/departments', { templateUrl: '/partials/departments/index.html', controller: 'departmentsCtrl' });
        $routeProvider.when('/departments/new', { templateUrl: '/partials/departments/create.html' });
        $routeProvider.when('/departments/:id', { templateUrl: '/partials/departments/edit.html' });
        $routeProvider.when('/class', { templateUrl: '/partials/class/index.html', controller: 'classCtrl' });
        $routeProvider.when('/class/new', { templateUrl: '/partials/class/create.html', controller: 'createClassCtrl' });
        $routeProvider.when('/class/:id', { templateUrl: '/partials/class/edit.html', controller: 'editClassCtrl' });
        $routeProvider.when('/students', { templateUrl: '/partials/students/index.html', controller: 'studentsCtrl' });

        $routeProvider.when('/404', { templateUrl: '/partials/404.html' });
        $routeProvider.otherwise({ redirectTo: '/404' });

        $locationProvider.html5Mode(true);
    }]);

})();