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
        'subjects.controllers',
        'scores.controllers',
        'teachers.controllers',
        'users.controllers',

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
        $routeProvider.when('/teachers', { templateUrl: '/partials/teachers/index.html', controller: 'teachersCtrl' });
        $routeProvider.when('/teachers/new', { templateUrl: '/partials/teachers/create.html', controller: 'createTeachersCtrl' });
        $routeProvider.when('/teachers/:id', { templateUrl: '/partials/teachers/edit.html', controller: 'editTeachersCtrl' });
        $routeProvider.when('/students', { templateUrl: '/partials/students/index.html', controller: 'studentsCtrl' });
        $routeProvider.when('/students/new', { templateUrl: '/partials/students/create.html', controller: 'createStudentsCtrl' });
        $routeProvider.when('/students/:id', { templateUrl: '/partials/students/edit.html', controller: 'editStudentsCtrl' });
        $routeProvider.when('/subjects', { templateUrl: '/partials/subjects/index.html', controller: 'subjectsCtrl' });
        $routeProvider.when('/subjects/new', { templateUrl: '/partials/subjects/create.html', controller: 'createSubjectsCtrl' });
        $routeProvider.when('/subjects/:id', { templateUrl: '/partials/subjects/edit.html', controller: 'editSubjectsCtrl' });
        $routeProvider.when('/scores', { templateUrl: '/partials/scores/index.html', controller: 'scoresCtrl' });
        $routeProvider.when('/scores/new', { templateUrl: '/partials/scores/create.html', controller: 'createScoresCtrl' });
        $routeProvider.when('/scores/:StudentId/:SubjectId', { templateUrl: '/partials/scores/edit.html', controller: 'editScoresCtrl' });
        $routeProvider.when('/auth/users', { templateUrl: '/partials/auth/users/index.html', controller: 'usersCtrl' });
        $routeProvider.when('/auth/users/new', { templateUrl: '/partials/auth/users/create.html', controller: 'createUsersCtrl' });
        $routeProvider.when('/auth/users/:id', { templateUrl: '/partials/auth/users/edit.html', controller: 'editUsersCtrl' });
        $routeProvider.when('/404', { templateUrl: '/partials/404.html' });
        $routeProvider.otherwise({ redirectTo: '/404' });

        $locationProvider.html5Mode(true);
    }]);

})();