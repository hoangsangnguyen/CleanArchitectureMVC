(function () {
    'use strict';

    angular
        .module('helloApp')
        .factory('DepartmentService', DepartmentService);

    DepartmentService.$inject = ['$http', 'AppConstants'];
    function DepartmentService($http, AppConstants) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetViewModels = GetViewModels;

        return service;

        function GetAll(searchData) {
            return $http({
                method: 'GET',
                url: AppConstants.api + '/departments',
                params: searchData
            }).then(handleSuccess, handleError('Error getting all departments'));
        }

        function GetById(id) {
            return $http.get(AppConstants.api + '/departments/' + id).then(handleSuccess, handleError('Error getting department by id'));
        }

        function Create(department) {
            return $http.post(AppConstants.api + '/departments', department).then(handleSuccess, handleError('Error creating department'));
        }

        function Update(department) {
            return $http.put(AppConstants.api + '/departments', department).then(handleSuccess, handleError('Error updating department'));
        }

        function Delete(id) {
            return $http.delete(AppConstants.api + '/departments/' + id).then(handleSuccess, handleError('Error deleting department'));
        }

        function GetViewModels() {
            return $http.get(AppConstants.api + '/departments/viewmodel').then(handleSuccess, handleError('Error getting department'));
        }
        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
