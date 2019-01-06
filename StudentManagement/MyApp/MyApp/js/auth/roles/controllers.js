/* global angular */
(function () {
    "use strict";

    var app = angular.module('roles.controllers', []);
    var rootUrl = "http://localhost/Backend/roles";

    app.controller('rolesCtrl', ['$scope', '$http', '$window', '$location',
        function ($scope, $http, $window, $location) {
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
                    document.getElementById('createArea').style.display = "none";
                }

                initView();
            });

            function initView() {
                var crudServiceBaseUrl = rootUrl,
                    dataSource = new kendo.data.DataSource({
                        dataType: "json",
                        transport: {
                            read: {
                                url: crudServiceBaseUrl,
                                dataType: "json",
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
                                data: additionalData
                            },
                            parameterMap: function (options, operation) {
                                if (operation === "read")
                                    return options;

                                else if (options.models)
                                    return kendo.stringify(options.models[0]);
                            }
                        },
                        batch: true,
                        pageSize: 20,
                        schema: {
                            data: "Results",
                            total: "ItemCount",
                        }
                    });

                $("#grid").kendoGrid({
                    dataSource: dataSource,
                    pageable: true,
                    height: 550,
                    columns: [
                        { field: "SystemName", title: "SystemName" },
                        { field: "Display", title: "Display" },

                        {
                            field: "SystemName",
                            title: " ",
                            width: 100,
                            headerAttributes: { style: "text-align:center" },
                            attributes: { style: "text-align:center" },
                            template: '<a class="btn btn-default" href="/auth/roles/#=SystemName#"><i class="fa fa-pencil"></i>Detail</a>'
                        }]
                });

                function additionalData() {
                    var data = {
                        SystemName: $scope.systemName,
                        Display: $scope.displayName,
                    }
                    return data;
                }
            }

            $scope.onSearch = function () {
                var grid = $('#grid').data('kendoGrid');
                grid.dataSource.page(1); //new search. Set page size to 1
                grid.dataSource.read();

                return false;
            }

            $("".concat("#SystemName,", "#DisplayName")).keydown(function (event) {
                if (event.keyCode === 13) {
                    $scope.onSearch();
                    return false;
                }
            });

        }
    ]);

    app.controller('createRolesCtrl', ['$scope', '$http', '$location', '$window',
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
                    data: JSON.stringify({ SystemName: $scope.systemName, Display: $scope.displayName }),
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $location.path("/auth/roles");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/auth/roles");
            }

        }
    ]);

    app.controller('editRolesCtrl', ['$scope', '$http', '$location', '$routeParams', '$window',
        function ($scope, $http, $location, $routeParams, $window) {
            var SystemName = $routeParams.SystemName;
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
                    url: rootUrl + '/' + SystemName,
                    headers: { 'Authorization': $window.localStorage.getItem('token') }
                })
                    .then(function (response) {
                        $scope.systemName = response.data.Results.SystemName;
                        $scope.displayName = response.data.Results.Display;
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
                    data: JSON.stringify({ SystemName: $scope.systemName, Display: $scope.displayName }),
                    headers: { 'Authorization': $window.localStorage.getItem('token') }
                })
                    .then(function (response) {
                        $location.path("/auth/roles");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/auth/roles");
            }

            $scope.onDelete = function () {
                $http({
                    method: 'DELETE',
                    url: rootUrl + '/' + SystemName,
                    headers: { 'Authorization': $window.localStorage.getItem('token') }
                })
                    .then(function (response) {
                        $location.path("/auth/roles");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

        }
    ]);

})();

