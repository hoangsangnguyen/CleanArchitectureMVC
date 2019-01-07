/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('SubjectEditController', SubjectEditController);
    SubjectEditController.$inject = ['$scope', '$http', '$window', '$location', '$routeParams', 'AppConstants', 'SubjectService'];
    function SubjectEditController($scope, $http, $window, $location, $routeParams, AppConstants, SubjectService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');

            if (currentUser === null) {
                $location.path("/login");
                return;
            }
            var role = JSON.parse($window.localStorage.getItem('currentUser')).Meta.Role;
            var roleName = JSON.parse(role).SystemName;
            $scope.isAdminOrManager = roleName == 'admin' || roleName == 'manager';

            initView();
        });

        function initView() {
            SubjectService.GetById($routeParams.Id).then(
                function (response) {
                    $scope.data = response.Results;
                },
                function (error) {
                    alert('Get subject failed');
                }
            )
        }

        $scope.onSave = function () {
            SubjectService.Update($scope.data).then(
                function (response) {
                    $location.path("/subjects");
                },
                function (error) {
                    alert('Update subject failed');
                }
            )
        }

        $scope.onDelete = function () {
            SubjectService.Delete($routeParams.Id).then(
                function (response) {
                    $location.path("/subjects");
                },
                function (error) {
                    alert('Update subject failed');
                }
            )
        }

        $scope.onBack = function () {
            $location.path("/subjects");
        }
    }

})();

