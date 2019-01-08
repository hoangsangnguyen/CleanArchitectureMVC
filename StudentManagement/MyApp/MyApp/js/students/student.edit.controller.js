/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('StudentEditController', StudentEditController);
    StudentEditController.$inject = ['$scope', '$http', '$window', '$location', '$routeParams', 'AppConstants', 'StudentService', 'ClassService'];
    function StudentEditController($scope, $http, $window, $location, $routeParams, AppConstants, StudentService, ClassService) {
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
            StudentService.GetById($routeParams.Id).then(
                function (response) {
                    $scope.data = response.Results;
                },
                function (error) {
                    alert('Get student by id failed');
                }
            )
        }

        $scope.classesDataSource = {
            serverFiltering: true,
            transport: {
                type: "json",
                read: function (e) {
                    return ClassService.GetViewModels()
                        .then(function (classes) {
                            e.success(classes);
                        });
                }
            }
        };

        $scope.onSave = function () {
            StudentService.Update($scope.data).then(
                function (response) {
                    $location.path("/students");
                },
                function (error) {
                    alert('Update student failed');
                }
            )
        }

        $scope.onDelete = function () {
            StudentService.Delete($routeParams.Id).then(
                function (response) {
                    $location.path("/students");
                },
                function (error) {
                    alert('Delete student failed');
                }
            )
        }

        $scope.onBack = function () {
            $location.path("/students");
        }
    }

})();

