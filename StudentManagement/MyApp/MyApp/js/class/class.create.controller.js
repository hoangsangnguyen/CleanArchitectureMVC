/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('ClassCreateController', ClassCreateController);
    ClassCreateController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'ClassService', 'DepartmentService'];
    function ClassCreateController($scope, $http, $window, $location, AppConstants, ClassService, DepartmentService) {
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

        $scope.data = { Name: '', DepartmentId: '' };

        $scope.departmentsDataSource = {
            serverFiltering: true,
            transport: {
                type: "json",
                read: function (e) {
                    return DepartmentService.GetViewModels()
                        .then(function (departments) {
                            e.success(departments);
                        });
                }
            }
        };

        $scope.onSave = function () {
            ClassService.Create($scope.data).then(
                function (response) {
                    $location.path("/classes");
                }, function (error) {
                    alert('Create new class failed: ', error);
                });
        }

        $scope.onBack = function () {
            $location.path("/classes");
        }
    }

})();

