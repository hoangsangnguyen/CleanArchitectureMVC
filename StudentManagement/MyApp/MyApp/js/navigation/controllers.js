/* global angular */
(function () {
    "use strict";
    var app = angular.module('navigation.controllers', []);

    app.controller('navigationCtrl', ['$scope', '$location', '$window', '$rootScope',
        function ($scope, $location, $window, $rootScope) {
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

            function initViewAfterLogin() {
                $scope.DisplayName = JSON.parse($window.localStorage.getItem('userInfo')).DisplayName;
                $('#menu ul li #displayName').show();

                $scope.Logout = 'Logout';
                $('#menu ul li #logout').show();

                $scope.Login = '';
                $('#menu ul li #login').hide();
            }

            function initViewBeforeLogin() {
                $scope.DisplayName = '';
                $('#menu ul li #displayName').hide();

                $scope.Logout = '';
                $('#menu ul li #logout').hide();

                $scope.Login = 'Login';
                $('#menu ul li #login').show();
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
    ]);
})();
