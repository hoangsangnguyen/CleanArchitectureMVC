/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('SubjectListController', SubjectListController);
    SubjectListController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'SubjectService'];
    function SubjectListController($scope, $http, $window, $location, AppConstants, SubjectService) {
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

        $scope.mainGridOptions = {
            dataSource: {
                transport: {
                    type: "odata",
                    read: function (e) {
                        return SubjectService.GetAll($scope.searchData)
                            .then(function (subjects) {
                                e.success(subjects);
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
                { field: "Name", title: "Name" },
                {
                    field: "Id",
                    title: " ",
                    width: 100,
                    headerAttributes: { style: "text-align:center" },
                    attributes: { style: "text-align:center" },
                    template: '<a class="btn btn-default" href="/subjects/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
                }]
        };

        $scope.onSearch = function () {
            $scope.grid.dataSource.read();
            return false;
        }
    }

})();

