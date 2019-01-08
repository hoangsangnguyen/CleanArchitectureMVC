/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('RoleEditController', RoleEditController);
    RoleEditController.$inject = ['$scope', '$http', '$window', '$location', '$routeParams', 'AppConstants', 'RoleService'];
    function RoleEditController($scope, $http, $window, $location, $routeParams, AppConstants, RoleService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');
            var role = JSON.parse($window.localStorage.getItem('currentUser')).Meta.Role;
            var roleName = JSON.parse(role).SystemName;
            $scope.isAdmin = roleName == 'admin';

            if (currentUser === null || !$scope.isAdmin) {
                $location.path("/login");
                return;
            }

            initView();
        });

        function initView() {
            RoleService.GetById($routeParams.SystemName).then(
                function (response) {
                    $scope.data = response.Results;
                },
                function (error) {
                    alert('Get role failed');
                }
            )
        }

        $scope.onSave = function () {
            RoleService.Update($scope.data).then(
                function (response) {
                    $location.path("/auth/roles");
                },
                function (error) {
                    alert('Update role failed');
                }
            )
        }

        $scope.onDelete = function () {
            RoleService.Delete($routeParams.SystemName).then(
                function (response) {
                    $location.path("/auth/roles");
                },
                function (error) {
                    alert('Update role failed');
                }
            )
        }

        $scope.onBack = function () {
            $location.path("/auth/roles");
        }
    }

})();

