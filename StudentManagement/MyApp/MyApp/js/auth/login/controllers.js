/* global angular */
(function () {
    "use strict";

    var app = angular.module('login.controllers', []);
    var url = 'http://localhost/Backend';

    app.controller('loginCtrl', ['$scope', '$http', '$window', '$rootScope',
        function ($scope, $http, $window, $rootScope) {
            $scope.login = function () {
                $http.post(url + '/auth', getData())
                    .success(function (response) {
                        $window.localStorage.setItem('token', 'Bearer ' + response.BearerToken);
                        $window.localStorage.setItem('displayName', response.DisplayName);
                        $rootScope.$emit("LoginSucceed", {});
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

