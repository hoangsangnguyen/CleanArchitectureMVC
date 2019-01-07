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

        $scope.onSearch = function () {
            var grid = $('#grid').data('kendoGrid');
            grid.dataSource.page(1); //new search. Set page size to 1
            grid.dataSource.read();

            return false;
        }
    }

})();

