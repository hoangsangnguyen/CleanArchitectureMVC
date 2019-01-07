/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('SubjectCreateController', SubjectCreateController);
    SubjectCreateController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'SubjectService'];
    function SubjectCreateController($scope, $http, $window, $location, AppConstants, SubjectService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');

            if (currentUser === null) {
                $location.path("/login");
                return;
            }
            var role = JSON.parse($window.localStorage.getItem('currentUser')).Meta.Role;
            var roleName = JSON.parse(role).SystemName;
            $scope.isAdminOrManager = roleName == 'admin' || roleName == 'manager'
        });

        $scope.onSave = function () {
            SubjectService.Create($scope.data).then(
                function (response) {
                    $location.path("/subjects");
                },
                function (error) {
                    alert('Create subject failed');
                }
            )
        }

        $scope.onSearch = function () {
            $scope.grid.dataSource.read();
            return false;
        }
    }

})();

