/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('ClassEditController', ClassEditController);
    ClassEditController.$inject = ['$scope', '$http', '$window', '$location', '$routeParams', 'AppConstants', 'ClassService', 'DepartmentService'];
    function ClassEditController($scope, $http, $window, $location, $routeParams, AppConstants, ClassService, DepartmentService) {
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
            $("#departmentId").kendoComboBox({
                dataTextField: "Name",
                dataValueField: "Id",
                filter: "contains",
                autoBind: true,
                dataSource: {
                    dataType: "odata",
                    serverFiltering: true,
                    transport: {
                        read: function (e) {
                            return DepartmentService.GetViewModels()
                                .then(function (departments) {
                                    e.success(departments);
                                });
                        }
                    }
                }
            });

            ClassService.GetById($routeParams.Id).then(
                function (response) {
                    $scope.data = response.Results;
                    $("#departmentId").data("kendoComboBox").value($scope.data.DepartmentId);
                },
                function (error) {
                    alert('Get class by id failed');
                }
            );
        }

        $scope.onSave = function () {
            $scope.data.DepartmentId = $("#departmentId").data("kendoComboBox").value() || '';
            ClassService.Update($scope.data).then(
                function (response) {
                    $location.path("/classes");
                }, function (error) {
                    alert('Update new class failed: ', error);
                });
        }

        $scope.onDelete = function () {
            ClassService.Delete($routeParams.Id).then(
                function (response) {
                    $location.path("/classes");
                }, function (error) {
                    alert('Delete class with Id failed: ', error);
                });
        }

        $scope.onBack = function () {
            $location.path("/classes");
        }
    }

})();

