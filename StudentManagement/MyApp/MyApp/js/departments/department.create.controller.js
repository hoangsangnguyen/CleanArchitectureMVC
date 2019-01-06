/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('DepartmentCreateController', DepartmentCreateController);
    DepartmentCreateController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'DepartmentService'];
    function DepartmentCreateController($scope, $http, $window, $location, AppConstants, DepartmentService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');

            if (currentUser === null) {
                $location.path("/login");
                return;
            }
            var role = JSON.parse($window.localStorage.getItem('currentUser')).Meta.Role;
            var roleName = JSON.parse(role).SystemName;
            $scope.isAdminOrManager = roleName == 'admin' || roleName == 'manager'

        });

        $scope.onSave = function () {
            DepartmentService.Create($scope.data).then(function (response) {
                $location.path("/departments");
            }, function (error) {
                alert('Create failed');
            });

            //$http({
            //    method: 'POST',
            //    url: rootUrl,
            //    data: JSON.stringify({ Name: $scope.name }),
            //    headers: { 'Authorization': $window.localStorage.getItem('token') },
            //})
            //    .then(function (response) {
            //        $location.path("/departments");
            //    }).catch(function (e) {
            //        console.log('Error: ', e);
            //        throw e;
            //    }).finally(function () {
            //    });
        }

        $scope.onBack = function () {
            $location.path("/departments");
        }

    }

    app.controller('createDepartmentCtrl', ['$scope', '$http', '$location', '$window',
        function ($scope, $http, $location, $window) {




        }
    ]);

    app.controller('editDepartmentCtrl', ['$scope', '$http', '$location', '$routeParams', '$window',
        function ($scope, $http, $location, $routeParams, $window) {
            var id = $routeParams.id;
            $(document).ready(function () {
                var token = $window.localStorage.getItem('token');
                if (token === null) {
                    $location.path("/auth/login");
                    return;
                }

                // update view by role name
                var role = JSON.parse($window.localStorage.getItem('userInfo')).Role;
                var roleName = JSON.parse(role).SystemName;
                if (roleName !== 'admin' && roleName !== 'manager') {
                    document.getElementById('btnSave').style.display = "none";
                    document.getElementById('btnDelete').style.display = "none";
                }

                $http({
                    method: 'GET',
                    url: rootUrl + '/' + id,
                    headers: { 'Authorization': $window.localStorage.getItem('token') }
                })
                    .then(function (response) {
                        $scope.name = response.data.Results.Name;
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            });

            $scope.onSave = function () {
                $http({
                    method: 'PUT',
                    url: rootUrl,
                    data: JSON.stringify({ Id: id, Name: $scope.name }),
                    headers: { 'Authorization': $window.localStorage.getItem('token') }
                })
                    .then(function (response) {
                        $location.path("/departments");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/departments");
            }

            $scope.onDelete = function () {
                $http({
                    method: 'DELETE',
                    url: rootUrl + '/' + id,
                    headers: { 'Authorization': $window.localStorage.getItem('token') }
                })
                    .then(function (response) {
                        $location.path("/departments");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

        }
    ]);

})();

