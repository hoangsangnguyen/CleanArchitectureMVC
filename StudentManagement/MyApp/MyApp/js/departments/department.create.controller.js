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
        }

        $scope.onBack = function () {
            $location.path("/departments");
        }

    }
})();

