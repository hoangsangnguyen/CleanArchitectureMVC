(function () {
    'use strict';

    angular.module('helloApp', ['ngRoute', 'kendo.directives']).config(config)
        .run(run)
        .constant('AppConstants', {
            api: 'http://localhost/Backend',
            jwtKey : 'jwtToken',
            appName : 'School Management'
        });

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: '/partials/home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: '/partials/auth/login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/departments', {
                controller: 'DepartmentListController',
                templateUrl: '/partials/departments/department.list.html',
                controllerAs: 'vm'
            })

            .when('/departments/new', {
                controller: 'DepartmentCreateController',
                templateUrl: '/partials/departments/department.create.html',
                controllerAs: 'vm'
            })

            .when('/departments/:Id', {
                controller: 'DepartmentEditController',
                templateUrl: '/partials/departments/department.edit.html',
                controllerAs: 'vm'
            })

            .when('/classes', {
                controller: 'ClassListController',
                templateUrl: '/partials/class/class.list.html',
                controllerAs: 'vm'
            })

            .when('/classes/new', {
                controller: 'ClassCreateController',
                templateUrl: '/partials/class/class.create.html',
                controllerAs: 'vm'
            })

            .when('/classes/:Id', {
                controller: 'ClassEditController',
                templateUrl: '/partials/class/class.edit.html',
                controllerAs: 'vm'
            })

            .when('/teachers', {
                controller: 'TeacherListController',
                templateUrl: '/partials/teachers/teacher.list.html',
                controllerAs: 'vm'
            })

            .when('/teachers/new', {
                controller: 'TeacherCreateController',
                templateUrl: '/partials/teachers/teacher.create.html',
                controllerAs: 'vm'
            })

            .when('/teachers/:Id', {
                controller: 'TeacherEditController',
                templateUrl: '/partials/teachers/teacher.edit.html',
                controllerAs: 'vm'
            })

            .when('/students', {
                controller: 'StudentListController',
                templateUrl: '/partials/students/student.list.html',
                controllerAs: 'vm'
            })

            .when('/students/new', {
                controller: 'StudentCreateController',
                templateUrl: '/partials/students/student.create.html',
                controllerAs: 'vm'
            })

            .when('/students/:Id', {
                controller: 'StudentEditController',
                templateUrl: '/partials/students/student.edit.html',
                controllerAs: 'vm'
            })

            .when('/subjects', {
                controller: 'SubjectListController',
                templateUrl: '/partials/subjects/subject.list.html',
                controllerAs: 'vm'
            })

            .when('/subjects/new', {
                controller: 'SubjectCreateController',
                templateUrl: '/partials/subjects/subject.create.html',
                controllerAs: 'vm'
            })

            .when('/subjects/:Id', {
                controller: 'SubjectEditController',
                templateUrl: '/partials/subjects/subject.edit.html',
                controllerAs: 'vm'
            })

            .when('/scores', {
                controller: 'ScoreListController',
                templateUrl: '/partials/scores/score.list.html',
                controllerAs: 'vm'
            })

            .when('/scores/new', {
                controller: 'ScoreCreateController',
                templateUrl: '/partials/scores/score.create.html',
                controllerAs: 'vm'
            })

            .when('/scores/:StudentId/:SubjectId', {
                controller: 'ScoreEditController',
                templateUrl: '/partials/scores/score.edit.html',
                controllerAs: 'vm'
            })

            .when('/auth/users', {
                controller: 'UserListController',
                templateUrl: '/partials/auth/users/user.list.html',
                controllerAs: 'vm'
            })

            .when('/auth/users/new', {
                controller: 'UserCreateController',
                templateUrl: '/partials/auth/users/user.create.html',
                controllerAs: 'vm'
            })

            .when('/auth/users/:Id', {
                controller: 'UserEditController',
                templateUrl: '/partials/auth/users/user.edit.html',
                controllerAs: 'vm'
            })

            .when('/auth/roles', {
                controller: 'RoleListController',
                templateUrl: '/partials/auth/roles/role.list.html',
                controllerAs: 'vm'
            })

            .when('/auth/roles/new', {
                controller: 'RoleCreateController',
                templateUrl: '/partials/auth/roles/role.create.html',
                controllerAs: 'vm'
            })

            .when('/auth/roles/:SystemName', {
                controller: 'RoleEditController',
                templateUrl: '/partials/auth/roles/role.edit.html',
                controllerAs: 'vm'
            })

            //.when('/register', {
            //    controller: 'RegisterController',
            //    templateUrl: 'register/register.view.html',
            //    controllerAs: 'vm'
            //})

            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);
    }

    run.$inject = ['$rootScope', '$location', '$window', '$http'];
    function run($rootScope, $location, $window, $http) {
        // keep user logged in after page refresh
        var currentUser = $window.localStorage.getItem('currentUser') || null;

        if (currentUser) {
            currentUser = JSON.parse(currentUser);
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + currentUser.BearerToken;
        }

        //$rootScope.$on('$locationChangeStart', function (event, next, current) {
        //    // redirect to login page if not logged in and trying to access a restricted page
        //    var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        //    var loggedIn = $rootScope.globals.currentUser;
        //    if (restrictedPage && !loggedIn) {
        //        $location.path('/login');
        //    }
        //});
    }

})();
