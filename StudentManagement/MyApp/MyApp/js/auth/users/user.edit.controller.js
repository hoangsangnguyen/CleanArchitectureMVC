/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('UserEditController', UserEditController);
    UserEditController.$inject = ['$scope', '$http', '$window', '$location', '$routeParams', 'AppConstants', 'UserService', 'RoleService'];
    function UserEditController($scope, $http, $window, $location, $routeParams, AppConstants, UserService, RoleService) {
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
            UserService.GetById($routeParams.Id).then(
                function (response) {
                    $scope.data = response.Results;
                },
                function (error) {
                    alert('Get user by id failed');
                }
            )
        }

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

        $scope.onSave = function () {
            UserService.UpdateUserAndRole($scope.data).then(
                function (response) {
                    $location.path("/auth/users");
                },
                function (error) {
                    alert('Update user failed');
                }
            )
        }

        $scope.onDelete = function () {
            UserService.Delete($routeParams.Id).then(
                function (response) {
                    $location.path("/auth/users");
                },
                function (error) {
                    alert('Delete user failed');
                }
            )
        }

        $scope.onBack = function () {
            $location.path("/auth/users");
        }
    }

})();

