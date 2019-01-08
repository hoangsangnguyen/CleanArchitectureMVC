/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('UserCreateController', UserCreateController);
    UserCreateController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'UserService', 'RoleService'];
    function UserCreateController($scope, $http, $window, $location, AppConstants, UserService, RoleService) {
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

        $scope.data = {
            FirstName: '',
            LastName: '',
            DisplayName: '',
            UserName: '',
            Password: '',
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

        $scope.onSave = function () {
            UserService.Create($scope.data).then(
                function (response) {
                    $location.path("/auth/users");
                },
                function (error) {
                    alert('Create user failed');
                }
            )
        }

        $scope.onBack = function () {
            $location.path("/auth/users");
        }
    }

})();

