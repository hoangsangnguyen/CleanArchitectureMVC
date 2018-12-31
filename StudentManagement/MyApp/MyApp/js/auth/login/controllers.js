/* global angular */
(function () {
    "use strict";

    var app = angular.module('login.controllers', []);
    var url = 'http://localhost/Backend';

    app.controller('loginCtrl', ['$scope', '$http',
        function ($scope, $http) {
            $scope.login = function () {
                $http.post(url + '/auth', { 'Username': $scope.userName, 'Password': $scope.password })
                    .success(function (response) {
                        console.log('Response ', response);
                        getDepartments(response);
                    });
            }

            var getDepartments = function (session) {
                $http.get(url + '/departments')
                    .success(function (response) {
                        console.log('Response ', response);
                    });
            }

            var data = {
                'Username' : $scope.userName,
                'Password': $scope.password,
                //'provider' : "credentials",
            };
        }
    ]);
})();

