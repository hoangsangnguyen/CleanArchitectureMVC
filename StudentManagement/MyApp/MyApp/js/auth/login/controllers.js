/* global angular */
(function () {
    "use strict";

    var app = angular.module('login.controllers', []);
    var url = 'http://localhost/Backend';

    app.controller('loginCtrl', ['$scope', '$http', '$window',
        function ($scope, $http, $window) {
            $scope.login = function () {
                $http.post(url + '/auth', getData())
                    .success(function (response) {
                        console.log('Response ', response.BearerToken);
                        $window.localStorage.setItem('token', 'Bearer ' + response.BearerToken);
                    });
            }

            var getDepartments = function () {
                $http.get(url + '/departments', { headers: { 'Authorization': $window.localStorage.getItem('token')} })
                    .success(function (response) {
                        console.log('Response ', response);
                    });
            }
            function getData() {
                var data = {
                    Username: $scope.userName,
                    Password: $scope.password,
                    provider: 'credentials'
                };
                return data;
            }
           
        }
    ]);
})();

