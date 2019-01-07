/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('TeacherListController', TeacherListController);
    TeacherListController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'TeacherService', 'DepartmentService'];
    function TeacherListController($scope, $http, $window, $location, AppConstants, TeacherService, DepartmentService) {
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
                FirstName : '',
                LastName : '',
                DepartmentId : '',
                IsManager : ''
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

            var dropdownManagerData = [
                { text: "All", value: null },
                { text: "Manager", value: true },
                { text: "Member", value: false }
            ];

            $("#isManager").kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: dropdownManagerData,
                index: 0,
            });

            var dataSource = new kendo.data.DataSource({
                    dataType: "json",
                    transport: {
                        read: function (e) {
                            $scope.searchData.DepartmentId = $("#DepartmentId").data("kendoComboBox").value();
                            $scope.searchData.IsManager = $("#isManager").data("kendoDropDownList").value();
                            return TeacherService.GetAll($scope.searchData)
                                .then(function (teachers) {
                                    e.success(teachers.Results);
                                });
                        }
                    },
                    batch: true,
                    pageSize: 20,
                });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                height: 550,
                columns: [
                    { field: "FirstName", title: "First name" },
                    { field: "LastName", title: "Last name" },
                    { field: "DepartmentName", title: "Department name" },
                    { field: "IsManager", title: "Is manager" },
                    {
                        field: "Id",
                        title: " ",
                        width: 100,
                        headerAttributes: { style: "text-align:center" },
                        attributes: { style: "text-align:center" },
                        template: '<a class="btn btn-default" href="/teachers/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
                    }]
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

