/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('TeacherEditController', TeacherEditController);
    TeacherEditController.$inject = ['$scope', '$http', '$window', '$location', '$routeParams', 'AppConstants', 'TeacherService', 'DepartmentService'];
    function TeacherEditController($scope, $http, $window, $location, $routeParams, AppConstants, TeacherService, DepartmentService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');

            if (currentUser === null) {
                $location.path("/login");
                return;
            }
            var role = JSON.parse($window.localStorage.getItem('currentUser')).Meta.Role;
            var roleName = JSON.parse(role).SystemName;
            $scope.isAdminOrManager = roleName == 'admin' || roleName == 'manager'

            initView();
        });

        function initView() {
            TeacherService.GetById($routeParams.Id).then(
                function (response) {
                    $scope.data = response.Results;
                    $("#DepartmentId").data("kendoComboBox").value($scope.data.DepartmentId);
                },
                function (error) {
                    alert('Get teacher by id failed');
                }
            )
        }

        $scope.departmentsDataSource = {
            transport: {
                serverFiltering: true,
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
            TeacherService.Update($scope.data).then(
                function (response) {
                    $location.path("/teachers");
                },
                function (error) {
                    alert('Create teacher failed');
                }
            )
        }

        $scope.onDelete = function () {
            TeacherService.Delete($routeParams.Id).then(
                function (response) {
                    $location.path("/teachers");
                },
                function (error) {
                    alert('Delete teacher failed');
                }
            )
        }

        $scope.onBack = function () {
            $location.path("/teachers");
        }
    }

})();

