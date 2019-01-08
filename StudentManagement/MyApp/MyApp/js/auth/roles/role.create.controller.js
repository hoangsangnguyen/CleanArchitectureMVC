/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('RoleCreateController', RoleCreateController);
    RoleCreateController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'RoleService'];
    function RoleCreateController($scope, $http, $window, $location, AppConstants, RoleService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');
            var role = JSON.parse($window.localStorage.getItem('currentUser')).Meta.Role;
            var roleName = JSON.parse(role).SystemName;
            $scope.isAdmin = roleName == 'admin';

            if (currentUser === null || !$scope.isAdmin) {
                $location.path("/login");
                return;
            }
            
        });

        $scope.onSave = function () {
            RoleService.Create($scope.data).then(
                function (response) {
                    $location.path("/auth/roles");
                },
                function (error) {
                    alert('Create role failed');
                }
            )
        }

        $scope.onSearch = function () {
            $scope.grid.dataSource.read();
            return false;
        }
    }

})();

