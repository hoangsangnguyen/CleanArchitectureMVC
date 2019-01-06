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
                    },
                    batch: true,
                    pageSize: 1,
                }
            });
            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                },
                height: 550,
                columns: [
                    { field: "Name", title: "Name" },
                    {
                        field: "Id",
                        title: " ",
                        width: 100,
                        headerAttributes: { style: "text-align:center" },
                        attributes: { style: "text-align:center" },
                        template: '<a class="btn btn-default" href="/departments/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
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

    app.controller('createDepartmentCtrl', ['$scope', '$http', '$location', '$window',
        function ($scope, $http, $location, $window) {
            $(document).ready(function () {
                var token = $window.localStorage.getItem('token');
                if (token === null) {
                    $location.path("/auth/login");
                    return;
                }
            });

            $scope.onSave = function () {
                $http({
                    method: 'POST',
                    url: rootUrl,
                    data: JSON.stringify({ Name: $scope.name }),
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $location.path("/departments");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/departments");
            }

        }
    ]);

    app.controller('editDepartmentCtrl', ['$scope', '$http', '$location', '$routeParams', '$window',
        function ($scope, $http, $location, $routeParams, $window) {
            var id = $routeParams.id;
            $(document).ready(function () {
                var token = $window.localStorage.getItem('token');
                if (token === null) {
                    $location.path("/auth/login");
                    return;
                }

                // update view by role name
                var role = JSON.parse($window.localStorage.getItem('userInfo')).Role;
                var roleName = JSON.parse(role).SystemName;
                if (roleName !== 'admin' && roleName !== 'manager') {
                    document.getElementById('btnSave').style.display = "none";
                    document.getElementById('btnDelete').style.display = "none";
                }

                $http({
                    method: 'GET',
                    url: rootUrl + '/' + id,
                    headers: { 'Authorization': $window.localStorage.getItem('token') }
                })
                    .then(function (response) {
                        $scope.name = response.data.Results.Name;
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            });

            $scope.onSave = function () {
                $http({
                    method: 'PUT',
                    url: rootUrl,
                    data: JSON.stringify({ Id: id, Name: $scope.name }),
                    headers: { 'Authorization': $window.localStorage.getItem('token') }
                })
                    .then(function (response) {
                        $location.path("/departments");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/departments");
            }

            $scope.onDelete = function () {
                $http({
                    method: 'DELETE',
                    url: rootUrl + '/' + id,
                    headers: { 'Authorization': $window.localStorage.getItem('token') }
                })
                    .then(function (response) {
                        $location.path("/departments");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

        }
    ]);

})();

