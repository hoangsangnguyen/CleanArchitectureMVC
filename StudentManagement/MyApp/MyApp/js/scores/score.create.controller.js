/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('ScoreCreateController', ScoreCreateController);
    ScoreCreateController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'StudentService', 'SubjectService', 'ScoreService'];
    function ScoreCreateController($scope, $http, $window, $location, AppConstants, StudentService, SubjectService, ScoreService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');

            if (currentUser === null) {
                $location.path("/login");
                return;
            }
            var role = JSON.parse($window.localStorage.getItem('currentUser')).Meta.Role;
            var roleName = JSON.parse(role).SystemName;
            $scope.isAdminOrManager = roleName == 'admin' || roleName == 'manager';

        });

        $scope.data = {
            SubjectId: '',
            ScoreId: '',
            Mark: '',
        };

        $scope.studentDataSource = {
            serverFiltering: true,
            transport: {
                type: "json",
                read: function (e) {
                    return StudentService.GetViewModels()
                        .then(function (students) {
                            e.success(students);
                        });
                }
            }
        };

        $scope.subjectDataSource = {
            serverFiltering: true,
            transport: {
                type: "json",
                read: function (e) {
                    return SubjectService.GetViewModels()
                        .then(function (subjects) {
                            e.success(subjects);
                        });
                }
            }
        };

        $scope.onSave = function () {
            ScoreService.Create($scope.data).then(
                function (response) {
                    $location.path("/scores");
                },
                function (error) {
                    alert('Create score failed');
                }
            )
        }

        $scope.onBack = function () {
            $location.path("/scores");
        }
    }

})();

