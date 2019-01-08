/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('UserListController', UserListController);
    UserListController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'UserService', 'RoleService'];
    function UserListController($scope, $http, $window, $location, AppConstants, UserService, RoleService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');
            var role = JSON.parse($window.localStorage.getItem('currentUser')).Meta.Role;
            var roleName = JSON.parse(role).SystemName;
            $scope.isAdmin = roleName == 'admin';

            if (currentUser === null || !$scope.isAdmin) {
                $location.path("/login");
                return;
            }

            initView();
        });

        function initView() {
            $scope.searchData = {
                FirstName: '',
                LastName: '',
                DisplayName: '',
                UserName: '',
                RoleId: ''
            };

            $scope.rolesDataSource = {
                serverFiltering: true,
                transport: {
                    type: "json",
                    read: function (e) {
                        return RoleService.GetViewModels()
                            .then(function (roles) {
                                e.success(roles);
                            });
                    }
                }
            };

            $scope.mainGridOptions = {
                dataSource: {
                    transport: {
                        type: "odata",
                        read: function (e) {
                            return UserService.GetAll($scope.searchData)
                                .then(function (users) {
                                    e.success(users);
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
                    { field: "DisplayName", title: "Display name" },
                    { field: "UserName", title: "User name" },
                    { field: "RoleName", title: "Role name" },
                    {
                        field: "Id",
                        title: " ",
                        width: 100,
                        headerAttributes: { style: "text-align:center" },
                        attributes: { style: "text-align:center" },
                        template: '<a class="btn btn-default" href="/auth/users/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
                    }]
            };
        }

        $scope.onSearch = function () {
            $scope.grid.dataSource.read();

            return false;
        }
    }

})();

