/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('DepartmentEditController', DepartmentEditController);
    DepartmentEditController.$inject = ['$scope', '$http', '$window', '$location', '$routeParams', 'AppConstants', 'DepartmentService'];
    function DepartmentEditController($scope, $http, $window, $location, $routeParams, AppConstants, DepartmentService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');

            if (currentUser === null) {
                $location.path("/login");
                return;
            }
            var role = JSON.parse($window.localStorage.getItem('currentUser')).Meta.Role;
            var roleName = JSON.parse(role).SystemName;
            $scope.isAdminOrManager = roleName == 'admin' || roleName == 'manager'

            DepartmentService.GetById($routeParams.Id).then(function (response) {
                $scope.data = response.Results;
            }, function (error) {
                alert('Get department by id failed');
            });
        });

        $scope.onSave = function () {
            DepartmentService.Update($scope.data).then(function (response) {
                $location.path("/departments");
            }, function (error) {
                alert('Update failed');
            });
        }

        $scope.onDelete = function () {
            DepartmentService.Delete($routeParams.Id).then(function (response) {
                $location.path("/departments");
            }, function (error) {
                alert('Delete department failed');
            });
        }

        $scope.onBack = function () {
            $location.path("/departments");
        }

    }

})();

