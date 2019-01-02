/* global angular */
(function () {
    "use strict";

    var app = angular.module('subjects.controllers', []);
    var rootUrl = "http://localhost/Backend/subjects";

    app.controller('subjectsCtrl', ['$scope', '$http',
        function ($scope, $http) {
            $scope.name = "";
            var crudServiceBaseUrl = rootUrl,
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
                    {
                        field: "Id",
                        title: " ",
                        width: 100,
                        headerAttributes: { style: "text-align:center" },
                        attributes: { style: "text-align:center" },
                        template: '<a class="btn btn-default" href="/subjects/#=Id#"><i class="fa fa-pencil"></i>Detail</a>'
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

        }
    ]);

    app.controller('createSubjectsCtrl', ['$scope', '$http', '$location',
        function ($scope, $http, $location) {
            $scope.onSave = function () {
                $http.post(rootUrl, JSON.stringify({ Name: $scope.name }))
                    .then(function (response) {
                        console.log(response.data);
                        $location.path("/subjects");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/subjects");
            }

        }
    ]);

    app.controller('editSubjectsCtrl', ['$scope', '$http', '$location', '$routeParams',
        function ($scope, $http, $location, $routeParams) {
            var id = $routeParams.id;
            $(document).ready(function () {
                $http.get(rootUrl + '/' + id)
                    .then(function (response) {
                        $scope.name = response.data.Results.Name;
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            });

            $scope.onSave = function () {
                $http.put(rootUrl, JSON.stringify({ Id: id, Name: $scope.name }))
                    .then(function (response) {
                        $location.path("/subjects");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

            $scope.onBack = function () {
                $location.path("/subjects");
            }

            $scope.onDelete = function () {
                $http.delete(rootUrl + '/' + id)
                    .then(function (response) {
                        $location.path("/subjects");
                    }).catch(function (e) {
                        console.log('Error: ', e);
                        throw e;
                    }).finally(function () {
                    });
            }

        }
    ]);

})();

