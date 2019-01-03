/* global angular */
(function () {
    "use strict";

    var app = angular.module('users.controllers', []);
    var rootUrl = "http://localhost/Backend";

    app.controller('usersCtrl', ['$scope', '$http', '$window', '$location',
        function ($scope, $http, $window, $location) {

            function initView() {
                $("#RoleId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select role...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/roles/viewmodel",
                                dataType: "json",
                                data: filterRole,
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
                            }
                        }
                    }
                });

                function filterRole() {
                    var data = {
                        Name: $("#RoleId").data("kendoComboBox").value()
                    };
                    return data;
                }

                var crudServiceBaseUrl = rootUrl + "/users",
                    dataSource = new kendo.data.DataSource({
                        dataType: "json",
                        transport: {
                            read: {
                                url: crudServiceBaseUrl,
                                dataType: "json",
                                data: additionalData,
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
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
                            model: {
                                id: "Id",
                                fields: {
                                    FirstName: { validation: { required: true } },
                                    LastName: { validation: { required: true } },
                                    Score: { type: "number", validation: { min: 0, max: 10, required: true } }
                                }
                            }
                        }
                    });

                $("#grid").kendoGrid({
                    dataSource: dataSource,
                    pageable: true,
                    height: 550,
                    columns: [
                        { field: "FirstName", title: "First name" },
                        { field: "LastName", title: "Last name" },
                        { field: "DisplayName", title: "Display name" },
                        { field: "UserName", title: "User name" },
                        { field: "RoleName", title: "Role name" },
                        {
                            field: "Id",
                            title: " ",
                            width: 100,
                            headerAttributes: { style: "text-align:center" },
                            attributes: { style: "text-align:center" },
                            template: '<a class="btn btn-default" href="/auth/users/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
                        }]
                });

                function additionalData() {
                    var data = {
                        FirstName: $scope.firstName,
                        LastName: $scope.lastName,
                        DisplayName: $scope.displayName,
                        UserName: $scope.userName,
                        RoleId: $("#RoleId").data("kendoComboBox").value()
                    }
                    return data;
                }
            }

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

            $scope.onSearch = function () {
                var grid = $('#grid').data('kendoGrid');
                grid.dataSource.page(1); //new search. Set page size to 1
                grid.dataSource.read();

                return false;
            }

            $("".concat("#FirstName,", "#LastName,", '#UserName,', "#DisplayName,", "#RoleId")).keydown(function (event) {
                if (event.keyCode === 13) {
                    $scope.onSearch();
                    return false;
                }
            });
        }
    ]);

    app.controller('createUsersCtrl', ['$scope', '$http', '$location', '$window',
        function ($scope, $http, $location, $window) {
            function initView() {
                $("#RoleId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select role...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/roles/viewmodel",
                                dataType: "json",
                                data: filterRole,
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
                            }
                        }
                    }
                });

                function filterRole() {
                    var data = {
                        Name: $("#RoleId").data("kendoComboBox").value()
                    };
                    return data;
                }
            }

            $(document).ready(function () {
                var token = $window.localStorage.getItem('token');
                if (token === null) {
                    $location.path("/auth/login");
                    return;
                }
                initView();
            });

            $scope.onSave = function () {
                $http({
                    method: 'POST',
                    url: rootUrl + '/users',
                    data: getData(),
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $location.path("/auth/users");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            function getData() {
                var data = {
                    FirstName: $scope.firstName,
                    LastName: $scope.lastName,
                    DisplayName: $scope.displayName,
                    UserName: $scope.userName,
                    Password: $scope.password,
                    RoleId: $("#RoleId").data("kendoComboBox").value()
                }
                return data;
            }


            $scope.onBack = function () {
                $location.path("/auth/users");
            }


        }
    ]);

    app.controller('editUsersCtrl', ['$scope', '$http', '$location', '$routeParams', '$window',
        function ($scope, $http, $location, $routeParams, $window) {
            var id = $routeParams.id;

            function initView() {
                $("#RoleId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select role...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/roles/viewmodel",
                                dataType: "json",
                                data: filterRole,
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
                            }
                        }
                    }
                });

                function filterRole() {
                    var data = {
                        Name: $("#RoleId").data("kendoComboBox").value()
                    };
                    return data;
                }
            }
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

                initView();
                $http({
                    method: 'GET',
                    url: rootUrl + '/users/' + id,
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $scope.firstName = response.data.Results.FirstName;
                        $scope.lastName = response.data.Results.LastName;
                        $scope.displayName = response.data.Results.DisplayName;
                        $scope.userName = response.data.Results.UserName;
                        $scope.password = response.data.Results.Password;
                        $("#RoleId").data("kendoComboBox").value(response.data.Results.RoleId);
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            });

            $scope.onSave = function () {
                $http({
                    method: 'PUT',
                    url: rootUrl + '/users',
                    data: getData(),
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $location.path("/auth/users");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/auth/users");
            }

            $scope.onDelete = function () {
                $http({
                    method: 'DELETE',
                    url: rootUrl + '/users/' + id,
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $location.path("/auth/users");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            function getData() {
                var data = {
                    Id: id,
                    FirstName: $scope.firstName,
                    LastName: $scope.lastName,
                    DisplayName: $scope.displayName,
                    UserName: $scope.userName,
                    Password: $scope.password,
                    RoleId: $("#RoleId").data("kendoComboBox").value()
                }
                return data;
            }

        }
    ]);
})();

