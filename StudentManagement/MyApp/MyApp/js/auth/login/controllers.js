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
                    });
            }

            var data = {
                'Username' : $scope.userName,
                'Password' : $scope.password
            };
            //$scope.$watch('name', function () {
            //    if ($scope.name) {
            //        $http.get('/hello/' + $scope.name)
            //            .success(function (response) {
            //                $scope.helloResult = response.Result;
            //            });
            //    }
            //});

            //$scope.testFunction = function () {
            //    return true;
            //};
        }
    ]);
})();

