/* global angular */
(function () {
    "use strict";

    var app = angular.module('helloApp')
        .controller('DepartmentListController', DepartmentListController);
    DepartmentListController.$inject = ['$scope', '$http', '$window', '$location', 'AppConstants', 'DepartmentService'];
    function DepartmentListController($scope, $http, $window, $location, AppConstants, DepartmentService) {
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
            //$scope.mainGridOptions = {
            //    dataSource: {
            //        dataType: "json",
            //        transport: {
            //            read: function (e) {
            //                return DepartmentService.GetAll()
            //                    .then(function (departments) {
            //                        console.log('Department ', departments);
            //                        e.success(departments.Results);
            //                    });
            //            }
            //        },
            //        pageSize: 5,
            //        serverPaging: true,
            //        serverSorting: true
            //    },
            //    sortable: true,
            //    pageable: true,
            //    columns: [{
            //        field: "Name",
            //        title: "Name",
            //    },
            //    {
            //        field: "Id",
            //        title: " ",
            //        width: 100,
            //        headerAttributes: { style: "text-align:center" },
            //        attributes: { style: "text-align:center" },
            //        template: '<a class="btn btn-default" href="/departments/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
            //    }]
            //};

            var dataSource = new kendo.data.DataSource({
                dataType: "json",
                transport: {
                    read: function (e) {
                        return DepartmentService.GetAll($scope.searchData)
                            .then(function (departments) {
                                e.success(departments.Results);
                            });
                    }
                },
                batch: true,
                pageSize: 20,
            });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                height: 550,
                columns: [
                    { field: "Name", title: "Name" },
                    {
                        field: "Id",
                        title: " ",
                        width: 100,
                        headerAttributes: { style: "text-align:center" },
                        attributes: { style: "text-align:center" },
                        template: '<a class="btn btn-default" href="/teachers/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
                    }]
            });
        }

        $scope.onSearch = function () {
            var grid = $('#grid').data('kendoGrid');
            grid.dataSource.page(1); //new search. Set page size to 1
            grid.dataSource.read();

            return false;
        }
    }

})();

