/* global angular */
(function () {
    "use strict";

    var app = angular.module('class.controllers', []);
    var rootUrl = "http://localhost/Backend";

    app.controller('classCtrl', ['$scope', '$http',
        function ($scope, $http) {
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
                            data: filterDepartment
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
                            data: additionalData
                        },
                        update: {
                            url: crudServiceBaseUrl,
                            dataType: "json",
                            type: "put",
                            contentType: "application/json; charset=utf-8"
                        },
                        destroy: {
                            url: crudServiceBaseUrl,
                            dataType: "json",
                            type: "delete",
                            contentType: "application/json; charset=utf-8"
                        },
                        create: {
                            url: crudServiceBaseUrl,
                            type: "post",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
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
                    { field: "Name", title: "Name" },
                    { field: "DepartmentName", title: "Department" },
                    {
                        field: "Id",
                        title: " ",
                        width: 100,
                        headerAttributes: { style: "text-align:center" },
                        attributes: { style: "text-align:center" },
                        template: '<a class="btn btn-default" href="/class/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
                    }],
                editable: {
                    mode: "popup",
                    template: kendo.template($("#popup_editor").html()),
                    confirmation: "Delete",
                }
            });

            function additionalData() {
                var data = {
                    Name: $scope.name,
                    DepartmentId: $("#DepartmentId").data("kendoComboBox").value()
                }
                return data;
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


    app.controller('createClassCtrl', ['$scope', '$http', '$location',
        function ($scope, $http, $location) {
            $(document).ready(function () {
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
                            }
                        }
                    }
                });


            });

            $scope.onSave = function () {
                $http.post(rootUrl + '/classes', JSON.stringify({ Name: $scope.name, DepartmentId: $("#departmentId").data("kendoComboBox").value() }))
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

    app.controller('editClassCtrl', ['$scope', '$http', '$location', '$routeParams',
        function ($scope, $http, $location, $routeParams) {
            var id = $routeParams.id;

            $(document).ready(function () {
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
                            }
                        }
                    }
                });

                $http.get(rootUrl + '/classes/' + id)
                    .then(function (response) {
                        $scope.name = response.data.Results.Name;
                        $("#departmentId").data("kendoComboBox").value(response.data.Results.DepartmentId);
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            });

            $scope.onSave = function () {
                $http.put(rootUrl + '/classes', JSON.stringify({ Id: id, Name: $scope.name, DepartmentId: $("#departmentId").data("kendoComboBox").value() }))
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
                $http.delete(rootUrl + '/classes/' + id)
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

