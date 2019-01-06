/* global angular */
(function () {
    "use strict";

    var app = angular.module('class.controllers', []);
    var rootUrl = "http://localhost/Backend";

    app.controller('classCtrl', ['$scope', '$http', '$window', '$location',
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
                $("#DepartmentId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select department...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/departments/viewmodel",
                                dataType: "json",
                                data: filterDepartment,
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
                            }
                        }
                    }
                });

                function filterDepartment() {
                    var data = {
                        Name: $("#DepartmentId").data("kendoComboBox").value()
                    };
                    return data;
                }

                var crudServiceBaseUrl = rootUrl + "/classes",
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
                                //id: "Id",
                                //fields: {
                                //    FirstName: { validation: { required: true } },
                                //    LastName: { validation: { required: true } },
                                //    Score: { type: "number", validation: { min: 0, max: 10, required: true } }
                                //}
                            }
                        }
                    });

                $("#grid").kendoGrid({
                    dataSource: dataSource,
                    pageable: true,
                    height: 550,
                    columns: [
                        { field: "Name", title: "Name" },
                        { field: "DepartmentName", title: "Department" },
                        {
                            field: "Id",
                            title: " ",
                            width: 100,
                            headerAttributes: { style: "text-align:center" },
                            attributes: { style: "text-align:center" },
                            template: '<a class="btn btn-default" href="/class/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
                        }]
                });

                function additionalData() {
                    var data = {
                        Name: $scope.name,
                        DepartmentId: $("#DepartmentId").data("kendoComboBox").value()
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

            $("#Name").keydown(function (event) {
                if (event.keyCode === 13) {
                    $scope.onSearch();
                    return false;
                }
            });
        }
    ]);


    app.controller('createClassCtrl', ['$scope', '$http', '$location', '$window',
        function ($scope, $http, $location, $window) {
            $(document).ready(function () {
                var token = $window.localStorage.getItem('token');
                if (token === null) {
                    $location.path("/auth/login");
                    return;
                }

                initView();
            });

            function initView() {
                $("#departmentId").kendoComboBox({
                    dataTextField: "Name",
                    dataValueField: "Id",
                    filter: "contains",
                    autoBind: true,
                    dataSource: {
                        dataType: "odata",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/departments/viewmodel",
                                dataType: "json",
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
                            }
                        }
                    }
                });
            }

            $scope.onSave = function () {
                $http({
                    method: 'POST',
                    url: rootUrl + '/classes',
                    data: JSON.stringify({ Name: $scope.name, DepartmentId: $("#departmentId").data("kendoComboBox").value() }),
                    headers: { 'Authorization': $window.localStorage.getItem('token') }
                })
                    .then(function (response) {
                        $location.path("/class");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/class");
            }
        }
    ]);

    app.controller('editClassCtrl', ['$scope', '$http', '$location', '$routeParams', '$window',
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

                initView();
            });


            function initView() {
                $("#departmentId").kendoComboBox({
                    dataTextField: "Name",
                    dataValueField: "Id",
                    filter: "contains",
                    autoBind: true,
                    dataSource: {
                        dataType: "odata",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/departments/viewmodel",
                                dataType: "json",
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
                            }
                        }
                    }
                });

                $http({
                    method: 'GET',
                    url: rootUrl + '/classes/' + id,
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $scope.name = response.data.Results.Name;
                        $("#departmentId").data("kendoComboBox").value(response.data.Results.DepartmentId);
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onSave = function () {
                $http({
                    method: 'PUT',
                    url: rootUrl + '/classes',
                    data: JSON.stringify({ Id: id, Name: $scope.name, DepartmentId: $("#departmentId").data("kendoComboBox").value() }),
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $location.path("/class");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/class");
            }

            $scope.onDelete = function () {
                $http({
                    method: 'DELETE',
                    url: rootUrl + '/classes/' + id,
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $location.path("/class");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

        }
    ]);
})();

