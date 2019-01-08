/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('RoleListController', RoleListController);
    RoleListController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'RoleService'];
    function RoleListController($scope, $http, $window, $location, AppConstants, RoleService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');

            var role = JSON.parse($window.localStorage.getItem('currentUser')).Meta.Role;
            var roleName = JSON.parse(role).SystemName;
            $scope.isAdmin = roleName == 'admin';

            if (currentUser === null || !$scope.isAdmin) {
                $location.path("/login");
                return;
            }
           
        });

        $scope.mainGridOptions = {
            dataSource: {
                transport: {
                    type: "odata",
                    read: function (e) {
                        return RoleService.GetAll($scope.searchData)
                            .then(function (roles) {
                                e.success(roles);
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
                { field: "SystemName", title: "SystemName" },
                { field: "Display", title: "Display" },
                {
                    field: "Id",
                    title: " ",
                    width: 100,
                    headerAttributes: { style: "text-align:center" },
                    attributes: { style: "text-align:center" },
                    template: '<a class="btn btn-default" href="/auth/roles/#=SystemName#"><i class="fa fa-pencil"></i>Detail</a>'
                }]
        };

        $scope.onSearch = function () {
            $scope.grid.dataSource.read();
            return false;
        }
    }

})();

