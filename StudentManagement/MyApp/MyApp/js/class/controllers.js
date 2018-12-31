/* global angular */
(function () {
    "use strict";

    var app = angular.module('class.controllers', []);
    var rootUrl = "http://localhost/Backend";

    app.controller('classCtrl', ['$scope', '$http',
        function ($scope, $http) {
            $scope.name = "";
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
                toolbar: ["create"],
                columns: [
                    { field: "Name", title: "Name" },
                    { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
                editable: {
                    mode: "popup",
                    template: kendo.template($("#popup_editor").html()),
                    confirmation: "Delete",
                }
            });

            function additionalData() {
                var data = {
                    Name: $scope.name,
                }
                return data;
            }

            $scope.onSearch = function () {
                console.log(additionalData());
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
                    Name: $("#DepartmentId").data("kendoComboBox").input.val()
                };
                return data;
            }

            // edit popup
            $("#DepartmentIdEditForm").kendoComboBox({
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
                            data: filterDepartmentEditForm
                        }
                    }
                }
            });

            function filterDepartmentEditForm() {
                var data = {
                    Name: $("#DepartmentIdEditForm").data("kendoComboBox").input.val()
                };
                return data;
            }
        }
    ]);
})();

