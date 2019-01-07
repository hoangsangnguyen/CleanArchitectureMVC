/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('TeacherCreateController', TeacherCreateController);
    TeacherCreateController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'TeacherService', 'DepartmentService'];
    function TeacherCreateController($scope, $http, $window, $location, AppConstants, TeacherService, DepartmentService) {
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
            $scope.searchData = {
                FirstName: '',
                LastName: '',
                DepartmentId: '',
                IsManager: '',
                CreateNewUserLogin : ''
            };

            $("#DepartmentId").kendoComboBox({
                filter: "contains",
                dataTextField: "Name",
                dataValueField: "Id",
                placeholder: "Select department...",
                minLength: 0,
                dataSource: {
                    dataType: "json",
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
        }

        $scope.onSave = function () {
            $scope.data.DepartmentId = $("#DepartmentId").data("kendoComboBox").value();
            TeacherService.Create($scope.data).then(
                function (response) {
                    $location.path("/teachers");
                },
                function (error) {
                    alert('Create teacher failed');
                }
            )
        }

        $scope.onBack = function () {
            $location.path("/teachers");
        }
    }

})();

