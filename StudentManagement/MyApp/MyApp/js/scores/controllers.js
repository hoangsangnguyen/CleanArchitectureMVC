/* global angular */
(function () {
    "use strict";

    var app = angular.module('scores.controllers', []);
    var rootUrl = "http://localhost/Backend";

    app.controller('scoresCtrl', ['$scope', '$http',
        function ($scope, $http) {
            $("#StudentId").kendoComboBox({
                filter: "contains",
                dataTextField: "Name",
                dataValueField: "Id",
                placeholder: "Select student...",
                minLength: 0,
                dataSource: {
                    dataType: "json",
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: rootUrl + "/students/viewmodel",
                            dataType: "json",
                            data: filterStudents
                        }
                    }
                }
            });

            function filterStudents() {
                var data = {
                    Name: $("#StudentId").data("kendoComboBox").value()
                };
                return data;
            }

            $("#SubjectId").kendoComboBox({
                filter: "contains",
                dataTextField: "Name",
                dataValueField: "Id",
                placeholder: "Select subject...",
                minLength: 0,
                dataSource: {
                    dataType: "json",
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: rootUrl + "/subjects/viewmodel",
                            dataType: "json",
                            data: filterSubjects
                        }
                    }
                }
            });

            function filterSubjects() {
                var data = {
                    Name: $("#SubjectId").data("kendoComboBox").value()
                };
                return data;
            }

            var crudServiceBaseUrl = rootUrl + "/scores",
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
                    { field: "StudentName", title: "Student Name" },
                    { field: "SubjectName", title: "Subject Name" },
                    { field: "Mark", title: "Mark" },
                    {
                        title: " ",
                        width: 100,
                        headerAttributes: { style: "text-align:center" },
                        attributes: { style: "text-align:center" },
                        template: '<a class="btn btn-default" href="/scores/#=StudentId#/#=SubjectId#"><i class="fa fa-pencil"></i>Detail</a>'
                    }],
                editable: false
            });

            function additionalData() {
                var data = {
                    Mark: $scope.mark,
                    StudentId: $("#StudentId").data("kendoComboBox").value(),
                    SubjectId: $("#SubjectId").data("kendoComboBox").value()
                }
                return data;
            }

            $scope.onSearch = function () {
                var grid = $('#grid').data('kendoGrid');
                grid.dataSource.page(1); //new search. Set page size to 1
                grid.dataSource.read();

                return false;
            }

            $("".concat("#StudentId,", "#SubjectId,", "#Mark")).keydown(function (event) {
                if (event.keyCode === 13) {
                    $scope.onSearch();
                    return false;
                }
            });
        }
    ]);

    app.controller('createScoresCtrl', ['$scope', '$http', '$location',
        function ($scope, $http, $location) {
            $(document).ready(function () {
                $("#StudentId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select student...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/students/viewmodel",
                                dataType: "json",
                                data: filterStudents
                            }
                        }
                    }
                });

                function filterStudents() {
                    var data = {
                        Name: $("#StudentId").data("kendoComboBox").value()
                    };
                    return data;
                }

                $("#SubjectId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select subject...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/subjects/viewmodel",
                                dataType: "json",
                                data: filterSubjects
                            }
                        }
                    }
                });

                function filterSubjects() {
                    var data = {
                        Name: $("#SubjectId").data("kendoComboBox").value()
                    };
                    return data;
                }

            });

            $scope.onSave = function () {
                $http.post(rootUrl + '/scores', getData())
                    .then(function (response) {
                        $location.path("/scores");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/scores");
            }

            function getData() {
                var data = {
                    Mark: $scope.mark,
                    StudentId: $("#StudentId").data("kendoComboBox").value(),
                    SubjectId: $("#SubjectId").data("kendoComboBox").value()
                }
                return data;
            }
        }
    ]);

    app.controller('editScoresCtrl', ['$scope', '$http', '$location', '$routeParams',
        function ($scope, $http, $location, $routeParams) {
            var studentId = $routeParams.StudentId;
            var subjectId = $routeParams.SubjectId;

            $(document).ready(function () {
                $("#StudentId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select student...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/students/viewmodel",
                                dataType: "json",
                                data: filterStudents
                            }
                        }
                    }
                });

                function filterStudents() {
                    var data = {
                        Name: $("#StudentId").data("kendoComboBox").value()
                    };
                    return data;
                }

                $("#SubjectId").kendoComboBox({
                    filter: "contains",
                    dataTextField: "Name",
                    dataValueField: "Id",
                    placeholder: "Select subject...",
                    minLength: 0,
                    dataSource: {
                        dataType: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: rootUrl + "/subjects/viewmodel",
                                dataType: "json",
                                data: filterSubjects
                            }
                        }
                    }
                });

                function filterSubjects() {
                    var data = {
                        Name: $("#SubjectId").data("kendoComboBox").value()
                    };
                    return data;
                }

                $http.get(rootUrl + '/scores/' + studentId + '/' + subjectId)
                    .then(function (response) {
                        $scope.mark = response.data.Results.Mark;
                        var studentComboBox = $("#StudentId").data("kendoComboBox");
                        var subjectComboBox = $("#SubjectId").data("kendoComboBox");

                        subjectComboBox.value(response.data.Results.SubjectId);
                        studentComboBox.value(response.data.Results.StudentId);
                        subjectComboBox.readonly(true);
                        studentComboBox.readonly(true);

                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            });

            $scope.onSave = function () {
                $http.put(rootUrl + '/scores', getData())
                    .then(function (response) {
                        $location.path("/scores");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/scores");
            }

            $scope.onDelete = function () {
                $http.delete(rootUrl + '/scores/' + studentId + '/' + subjectId)
                    .then(function (response) {
                        $location.path("/scores");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            function getData() {
                var data = {
                    Mark: $scope.mark,
                    StudentId: $("#StudentId").data("kendoComboBox").value(),
                    SubjectId: $("#SubjectId").data("kendoComboBox").value()
                }
                return data;
            }
        }
    ]);
})();

