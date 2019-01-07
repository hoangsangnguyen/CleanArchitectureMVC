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

            initView();
        });

        function initView() {
            $scope.data = { Name: '', DepartmentId: '' };

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

            $scope.onSave = function () {
                $scope.data.DepartmentId = $("#departmentId").data("kendoComboBox").value() || '';
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
    }

})();

