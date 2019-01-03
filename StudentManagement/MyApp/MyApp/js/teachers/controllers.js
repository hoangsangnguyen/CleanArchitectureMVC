/* global angular */
(function () {
    "use strict";

    var app = angular.module('teachers.controllers', []);
    var rootUrl = "http://localhost/Backend";

    app.controller('teachersCtrl', ['$scope', '$http', '$window', '$location',
        function ($scope, $http, $window, $location) {

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
                                data: filterClass,
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
                            }
                        }
                    }
                });

                function filterClass() {
                    var data = {
                        Name: $("#DepartmentId").data("kendoComboBox").value()
                    };
                    return data;
                }

                var dropdownManagerData = [
                    { text: "All", value: null },
                    { text: "Manager", value: true },
                    { text: "Member", value: false }
                ];

                $("#isManager").kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: dropdownManagerData,
                    index: 0,
                });

                var crudServiceBaseUrl = rootUrl + "/teachers",
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
                        { field: "DepartmentName", title: "Department name" },
                        { field: "IsManager", title: "Is manager" },
                        {
                            field: "Id",
                            title: " ",
                            width: 100,
                            headerAttributes: { style: "text-align:center" },
                            attributes: { style: "text-align:center" },
                            template: '<a class="btn btn-default" href="/teachers/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
                        }]
                });

                function additionalData() {
                    var data = {
                        FirstName: $scope.firstName,
                        LastName: $scope.lastName,
                        DepartmentId: $("#DepartmentId").data("kendoComboBox").value(),
                        IsManager: $("#isManager").data("kendoDropDownList").value(),
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
                initView();
            });

            $scope.onSearch = function () {
                var grid = $('#grid').data('kendoGrid');
                grid.dataSource.page(1); //new search. Set page size to 1
                grid.dataSource.read();

                return false;
            }

            $("".concat("#FirstName,", "#LastName,", "#DepartmentId,", "#isManager")).keydown(function (event) {
                if (event.keyCode === 13) {
                    $scope.onSearch();
                    return false;
                }
            });
        }
    ]);

    app.controller('createTeachersCtrl', ['$scope', '$http', '$location', '$window',
        function ($scope, $http, $location, $window) {
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
                                data: filterClass,
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
                            }
                        }
                    }
                });

                function filterClass() {
                    var data = {
                        Name: $("#DepartmentId").data("kendoComboBox").value()
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
                    url: rootUrl + '/teachers',
                    data: getData(),
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $location.path("/teachers");
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
                    DepartmentId: $("#DepartmentId").data("kendoComboBox").value(),
                    IsManager: document.getElementById('isManager').checked
                }
                return data;
            }

            $scope.onBack = function () {
                $location.path("/teachers");
            }


        }
    ]);

    app.controller('editTeachersCtrl', ['$scope', '$http', '$location', '$routeParams', '$window',
        function ($scope, $http, $location, $routeParams, $window) {
            var id = $routeParams.id;

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
                                data: filterClass,
                                headers: { 'Authorization': $window.localStorage.getItem('token') },
                            }
                        }
                    }
                });

                function filterClass() {
                    var data = {
                        Name: $("#DepartmentId").data("kendoComboBox").value()
                    };
                    return data;
                }

                $http({
                    method: 'GET',
                    url: rootUrl + '/teachers/' + id,
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        console.log(response);
                        $scope.firstName = response.data.Results.FirstName;
                        $scope.lastName = response.data.Results.LastName;
                        $("#DepartmentId").data("kendoComboBox").value(response.data.Results.DepartmentId);
                        document.getElementById('isManager').checked = response.data.Results.IsManager;
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
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
                    method: 'PUT',
                    url: rootUrl + '/teachers',
                    data: getData(),
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $location.path("/teachers");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/teachers");
            }

            $scope.onDelete = function () {
                $http({
                    method: 'DELETE',
                    url: rootUrl + '/teachers/' + id,
                    headers: { 'Authorization': $window.localStorage.getItem('token') },
                })
                    .then(function (response) {
                        $location.path("/teachers");
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
                    DepartmentId: $("#DepartmentId").data("kendoComboBox").value(),
                    IsManager: document.getElementById('isManager').checked
                }
                return data;
            }

        }
    ]);
})();

