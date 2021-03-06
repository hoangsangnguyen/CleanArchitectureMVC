﻿/* global angular */
(function () {
    "use strict";
    var app = angular.module('helloApp')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['$scope', '$location', '$window', '$rootScope'];
    function NavigationController($scope, $location, $window, $rootScope) {
        $(document).ready(function () {
            var token = $window.localStorage.getItem('token');
            if (token === null) {
                initViewBeforeLogin();
            } else {
                initViewAfterLogin();
            }
        });

        $rootScope.$on("LoginSucceed", function () {
            initViewAfterLogin();
            $location.path('/');
        });

        function updateMenuByRole(role) {
            switch (role) {
                case 'admin':
                    $scope.Users = 'Users';
                    $('#menu ul li #users').show();
                    $scope.Roles = 'Roles';
                    $('#menu ul li #roles').show();
                    break;
                default:
                    $scope.Users = '';
                    $('#menu ul li #users').hide();
                    $scope.Roles = '';
                    $('#menu ul li #roles').hide();
                    break;
            }
        }

        function initViewAfterLogin() {
            $scope.DisplayName = JSON.parse($window.localStorage.getItem('userInfo')).DisplayName;
            $('#menu ul li #displayName').show();

            $scope.Logout = 'Logout';
            $('#menu ul li #logout').show();

            $scope.Login = '';
            $('#menu ul li #login').hide();

            var role = JSON.parse($window.localStorage.getItem('userInfo')).Role;
            var roleName = JSON.parse(role).SystemName;
            updateMenuByRole(roleName);

        }

        function initViewBeforeLogin() {
            $scope.DisplayName = '';
            $('#menu ul li #displayName').hide();

            $scope.Logout = '';
            $('#menu ul li #logout').hide();

            $scope.Login = 'Login';
            $('#menu ul li #login').show();

            updateMenuByRole('');
        }

        $scope.onLogout = function () {
            $window.localStorage.clear();
            initViewBeforeLogin();
            $location.path('/auth/login');
        };

        $scope.IsRouteActive = function (routePath) {
            return routePath === $location.path();
        };
    }
    //app.controller('navigationCtrl', ['$scope', '$location', '$window', '$rootScope',
    //    function ($scope, $location, $window, $rootScope) {
    //        $(document).ready(function () {
    //            var token = $window.localStorage.getItem('token');
    //            if (token === null) {
    //                initViewBeforeLogin();
    //            } else {
    //                initViewAfterLogin();
    //            }
    //        });

    //        $rootScope.$on("LoginSucceed", function () {
    //            initViewAfterLogin();
    //            $location.path('/');
    //        });

    //        function updateMenuByRole(role) {
    //            switch (role) {
    //                case 'admin':
    //                    $scope.Users = 'Users';
    //                    $('#menu ul li #users').show();
    //                    $scope.Roles = 'Roles';
    //                    $('#menu ul li #roles').show();
    //                    break;
    //                default:
    //                    $scope.Users = '';
    //                    $('#menu ul li #users').hide();
    //                    $scope.Roles = '';
    //                    $('#menu ul li #roles').hide();
    //                    break;
    //            }
    //        }

    //        function initViewAfterLogin() {
    //            $scope.DisplayName = JSON.parse($window.localStorage.getItem('userInfo')).DisplayName;
    //            $('#menu ul li #displayName').show();

    //            $scope.Logout = 'Logout';
    //            $('#menu ul li #logout').show();

    //            $scope.Login = '';
    //            $('#menu ul li #login').hide();

    //            var role = JSON.parse($window.localStorage.getItem('userInfo')).Role;
    //            var roleName = JSON.parse(role).SystemName;
    //            updateMenuByRole(roleName);

    //        }

    //        function initViewBeforeLogin() {
    //            $scope.DisplayName = '';
    //            $('#menu ul li #displayName').hide();

    //            $scope.Logout = '';
    //            $('#menu ul li #logout').hide();

    //            $scope.Login = 'Login';
    //            $('#menu ul li #login').show();

    //            updateMenuByRole('');
    //        }

    //        $scope.onLogout = function () {
    //            $window.localStorage.clear();
    //            initViewBeforeLogin();
    //            $location.path('/auth/login');
    //        };

    //        $scope.IsRouteActive = function (routePath) {
    //            return routePath === $location.path();
    //        };
    //    }
    //]);
})();
