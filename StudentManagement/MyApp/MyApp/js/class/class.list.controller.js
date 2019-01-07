/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('ClassListController', ClassListController);
    ClassListController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'ClassService', 'DepartmentService'];
    function ClassListController($scope, $http, $window, $location, AppConstants, ClassService, DepartmentService) {
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
            //$scope.mainGridOptions = {
            //    dataSource: {
            //        dataType: "json",
            //        transport: {
            //            read: function (e) {
            //                return DepartmentService.GetAll()
            //                    .then(function (departments) {
            //                        console.log('Department ', departments);
            //                        e.success(departments.Results);
            //                    });
            //            }
            //        },
            //        pageSize: 5,
            //        serverPaging: true,
            //        serverSorting: true
            //    },
            //    sortable: true,
            //    pageable: true,
            //    columns: [{
            //        field: "Name",
            //        title: "Name",
            //    },
            //    {
            //        field: "Id",
            //        title: " ",
            //        width: 100,
            //        headerAttributes: { style: "text-align:center" },
            //        attributes: { style: "text-align:center" },
            //        template: '<a class="btn btn-default" href="/departments/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
            //    }]
            //};

            $scope.departmentDataSource = {
                type: "odata",
                serverFiltering: true,
                transport: {
                    read: function (e) {
                        return DepartmentService.GetViewModels()
                            .then(function (departments) {
                                e.success(departments);
                            });
                    }
                }
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

            function filterDepartment() {
                var data = {
                    Name: $("#DepartmentId").data("kendoComboBox").value()
                };
                return data;
            }

            var dataSource = new kendo.data.DataSource({
                dataType: "json",
                transport: {
                    read: function (e) {
                        console.log($scope.searchData);
                        return ClassService.GetAll($scope.searchData)
                            .then(function (classes) {
                                e.success(classes.Results);
                            });
                    },
                    batch: true,
                    pageSize: 1,
                }
            });
            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                },
                height: 550,
                columns: [
                    { field: "Name", title: "Name" },
                    { field: "DepartmentName", title: "Department" },
                    {
                        field: "Id",
                        title: " ",
                        width: 100,
                        headerAttributes: { style: "text-align:center" },
                        attributes: { style: "text-align:center" },
                        template: '<a class="btn btn-default" href="/classes/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
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

