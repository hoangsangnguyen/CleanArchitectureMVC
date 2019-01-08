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

            $scope.mainGridOptions = {
                dataSource: {
                    transport: {
                        type: "odata",
                        read: function (e) {
                            return ClassService.GetAll($scope.searchData)
                                .then(function (classes) {
                                    e.success(classes);
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
            };
        }

        $scope.onSearch = function () {
            $scope.grid.dataSource.read();
            return false;
        }
    }

})();

