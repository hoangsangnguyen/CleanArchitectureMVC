/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('StudentCreateController', StudentCreateController);
    StudentCreateController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'StudentService', 'ClassService'];
    function StudentCreateController($scope, $http, $window, $location, AppConstants, StudentService, ClassService) {
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
            $scope.searchData = {
                FirstName: '',
                LastName: '',
                ClassId: '',
                StudentCode: '',
                DateOfBirth: ''
            };

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
        }

        $scope.onSave = function () {
            StudentService.Create($scope.data).then(
                function (response) {
                    $location.path("/students");
                },
                function (error) {
                    alert('Create student failed');
                }
            )
        }

        $scope.onBack = function () {
            $location.path("/students");
        }
    }

})();

