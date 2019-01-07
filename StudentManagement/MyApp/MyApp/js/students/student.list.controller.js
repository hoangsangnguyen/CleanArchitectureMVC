/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('StudentListController', StudentListController);
    StudentListController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'StudentService', 'ClassService'];
    function StudentListController($scope, $http, $window, $location, AppConstants, StudentService, ClassService) {
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
                DateOfBirth : ''
            };

            $scope.classesDataSource = {
                
                serverFiltering: true,
                transport: {
                    type: "json",
                    read: function (e) {
                        return ClassService.GetViewModels()
                            .then(function (classes) {
                                console.log(classes);
                                e.success(classes);
                            });
                    }
                }
            };

            $scope.mainGridOptions = {
                dataSource: {
                    transport: {
                        type: "odata",
                        read: function (e) {
                            return StudentService.GetAll($scope.searchData)
                                .then(function (students) {
                                    e.success(students);
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
                    { field: "ClassName", title: "Class name" },
                    { field: "StudentCode", title: "Code" },
                    { field: "DateOfBirth", title: "Date of birth" },
                    {
                        field: "Id",
                        title: " ",
                        width: 100,
                        headerAttributes: { style: "text-align:center" },
                        attributes: { style: "text-align:center" },
                        template: '<a class="btn btn-default" href="/students/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
                    }]
            };
        }

        $scope.onSearch = function () {
            $scope.grid.dataSource.read();

            return false;
        }
    }

})();

