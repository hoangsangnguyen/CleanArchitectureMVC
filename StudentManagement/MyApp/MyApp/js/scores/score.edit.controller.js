/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('ScoreEditController', ScoreEditController);
    ScoreEditController.$inject = ['$scope', '$http', '$window', '$location', '$routeParams', 'AppConstants', 'StudentService', 'SubjectService', 'ScoreService'];
    function ScoreEditController($scope, $http, $window, $location, $routeParams, AppConstants, StudentService, SubjectService, ScoreService) {
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
            ScoreService.GetById($routeParams.StudentId, $routeParams.SubjectId).then(
                function (response) {
                    $scope.data = response.Results;
                },
                function (error) {
                    alert('Get score by Id failed');
                }
            )

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

        }

        $scope.onSave = function () {
            ScoreService.Update($scope.data).then(
                function (response) {
                    $location.path("/scores");
                },
                function (error) {
                    alert('Create score failed');
                }
            )
        }

        $scope.onDelete = function () {
            ScoreService.Delete($routeParams.StudentId, $routeParams.SubjectId).then(
                function (response) {
                    $location.path("/scores");
                },
                function (error) {
                    alert('Delete score failed');
                }
            )
        }

        $scope.onBack = function () {
            $location.path("/scores");
        }
    }

})();

