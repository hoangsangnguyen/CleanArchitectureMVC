/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('ScoreListController', ScoreListController);
    ScoreListController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'StudentService', 'SubjectService', 'ScoreService'];
    function ScoreListController($scope, $http, $window, $location, AppConstants, StudentService, SubjectService, ScoreService) {
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
            $scope.searchData = {
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

            $scope.mainGridOptions = {
                dataSource: {
                    transport: {
                        type: "odata",
                        read: function (e) {
                            return ScoreService.GetAll($scope.searchData)
                                .then(function (scores) {
                                    e.success(scores);
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
                    { field: "StudentName", title: "Student Name" },
                    { field: "SubjectName", title: "Subject Name" },
                    { field: "Mark", title: "Mark" },
                    {
                        title: " ",
                        width: 100,
                        headerAttributes: { style: "text-align:center" },
                        attributes: { style: "text-align:center" },
                        template: '<a class="btn btn-default" href="/scores/#=StudentId#/#=SubjectId#"><i class="fa fa-pencil"></i>Detail</a>'
                    }]
            };
        }

        $scope.onSearch = function () {
            $scope.grid.dataSource.read();
            return false;
        }
    }

})();

