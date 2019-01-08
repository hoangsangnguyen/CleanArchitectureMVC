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

            $scope.searchData = {
                IsManager: ''
            }
        });

        $scope.isManagerDataSource = [
            { Name: "All", Value: '' },
            { Name: "Manager", Value: true },
            { Name: "Member", Value: false }
        ];

        $scope.departmentsDataSource = {
            transport: {
                serverFiltering: true,
                type: "odata",
                read: function (e) {
                    return DepartmentService.GetViewModels()
                        .then(function (departments) {
                            e.success(departments);
                        });
                }
            }
        };

        $scope.mainGridOptions = {
            dataSource: {
                transport: {
                    type: "odata",
                    read: function (e) {
                        return TeacherService.GetAll($scope.searchData)
                            .then(function (teachers) {
                                e.success(teachers);
                            });
                    }
                },
                schema: {
                    data: "Results",
                    total: "ItemCount"
                },
                batch: true,

            },
            sortable: true,
            pageable: {
                pageSize: 5,
                pageSizes: [5, 10, 20],
                refresh: true
            },
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
        };

        $scope.onSearch = function () {
            $scope.grid.dataSource.read();
            return false;
        }
    }

})();

