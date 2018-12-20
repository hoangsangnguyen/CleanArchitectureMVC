/* global angular */
(function () {
    "use strict";

    var app = angular.module('students.controllers', []);

    app.controller('studentsCtrl', ['$scope', '$http',
        function ($scope, $http) {
            var crudServiceBaseUrl = "http://localhost:59245/student",
                dataSource = new kendo.data.DataSource({
                    dataType: "json",
                    transport: {
                        read: {
                            url: crudServiceBaseUrl,
                            dataType: "json",
                        },
                        update: {
                            url: crudServiceBaseUrl ,
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
                            contentType: "application/json; charset=utf-8"
                        },
                        parameterMap: function (options, operation) {
                            if (operation !== "read" && options.models) {
                                return kendo.stringify(options.models[0]);
                            }
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
                                Score: { type: "number", validation: { min: 0, max : 10, required: true } }
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
                    { field: "FirstName", title: "FirstName" },
                    { field: "LastName", title: "LastName" },
                    { field: "Score", title: "Score" },
                    { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
                editable: "popup"
            });

            //$http.get('http://localhost:59245/student')
            //    .success(function (response) {
            //        $scope.students = response;
            //    });
        }
    ]);
})();