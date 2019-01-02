/* global angular */
(function () {
    "use strict";

    var app = angular.module('students.controllers', []);
    var rootUrl = "http://localhost/Backend";

    app.controller('studentsCtrl', ['$scope', '$http',
        function ($scope, $http) {
            function initView() {
                $scope.toDay = new Date();

                $("#dateOfBirth").kendoDatePicker({
                    culture: "vi-VN",
                    format: "yyyy-MM-dd",
                    dateInput: true
                });

                $("#ClassId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select class...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/classes/viewmodel",
                                dataType: "json",
                                data: filterClass
                            }
                        }
                    }
                });

                function filterClass() {
                    var data = {
                        Name: $("#ClassId").data("kendoComboBox").value()
                    };
                    return data;
                }

                var crudServiceBaseUrl = rootUrl + "/students",
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
                        }],
                    editable: {
                        mode: "popup",
                        template: kendo.template($("#popup_editor").html()),
                        confirmation: "Delete",
                    }
                });

                function additionalData() {
                    var data = {
                        FirstName: $scope.firstName,
                        LastName: $scope.lastName,
                        StudentCode: $scope.studentCode,
                        DateOfBirth: kendo.toString($('#dateOfBirth').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                        DepartmentId: $("#ClassId").data("kendoComboBox").value()
                    }
                    return data;
                }
            }

            $(document).ready(function () {
                initView();
            });

            


            $scope.onSearch = function () {
                var grid = $('#grid').data('kendoGrid');
                grid.dataSource.page(1); //new search. Set page size to 1
                grid.dataSource.read();

                return false;
            }

            $("".concat("#FirstName,", "#LastName,", "#StudentCode", "#ClassId,", "#dateOfBirth")).keydown(function (event) {
                if (event.keyCode === 13) {
                    $scope.onSearch();
                    return false;
                }
            });
        }
    ]);

    app.controller('createStudentsCtrl', ['$scope', '$http', '$location',
        function ($scope, $http, $location) {
            function initView() {
                $scope.toDay = new Date();

                $("#DateOfBirth").kendoDatePicker({
                    culture: "vi-VN",
                    format: "yyyy-MM-dd",
                    dateInput: true
                });

                $("#ClassId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select class...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/classes/viewmodel",
                                dataType: "json",
                                data: filterClass
                            }
                        }
                    }
                });

                function filterClass() {
                    var data = {
                        Name: $("#ClassId").data("kendoComboBox").value()
                    };
                    return data;
                }
            }

            $(document).ready(function () {
                initView();
            });

            $scope.onSave = function () {
                $http.post(rootUrl + '/students', getData())
                    .then(function (response) {
                        $location.path("/students");
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
                    StudentCode: $scope.studentCode,
                    ClassId: $("#ClassId").data("kendoComboBox").value(),
                    DateOfBirth: kendo.toString($('#DateOfBirth').data('kendoDatePicker').value(), 'yyyy-MM-dd')
                }
                return data;
            }


            $scope.onBack = function () {
                $location.path("/students");
            }

            
        }
    ]);

    app.controller('editStudentsCtrl', ['$scope', '$http', '$location', '$routeParams',
        function ($scope, $http, $location, $routeParams) {
            var id = $routeParams.id;

            function initView() {
                $scope.toDay = new Date();

                $("#DateOfBirth").kendoDatePicker({
                    culture: "vi-VN",
                    format: "yyyy-MM-dd",
                    dateInput: true
                });

                $("#ClassId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select class...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/classes/viewmodel",
                                dataType: "json",
                                data: filterClass
                            }
                        }
                    }
                });

                function filterClass() {
                    var data = {
                        Name: $("#ClassId").data("kendoComboBox").value()
                    };
                    return data;
                }
            }
            $(document).ready(function () {
                initView();
                $http.get(rootUrl + '/students/' + id)
                    .then(function (response) {
                        $scope.firstName = response.data.Results.FirstName;
                        $scope.lastName = response.data.Results.LastName;
                        $scope.studentCode = response.data.Results.StudentCode;
                        $("#ClassId").data("kendoComboBox").value(response.data.Results.ClassId);
                        $("#DateOfBirth").data("kendoDatePicker").value(response.data.Results.DateOfBirth);
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            });

            $scope.onSave = function () {
                $http.put(rootUrl + '/students', getData())
                    .then(function (response) {
                        $location.path("/students");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/students");
            }

            $scope.onDelete = function () {
                $http.delete(rootUrl + '/students/' + id)
                    .then(function (response) {
                        $location.path("/students");
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
                    StudentCode: $scope.studentCode,
                    ClassId: $("#ClassId").data("kendoComboBox").value(),
                    DateOfBirth: kendo.toString($('#DateOfBirth').data('kendoDatePicker').value(), 'yyyy-MM-dd')
                }
                return data;
            }

        }
    ]);
})();

