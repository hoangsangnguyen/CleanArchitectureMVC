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

        return service;

        function GetAll(searchData) {
            return $http({
                method: 'GET',
                url: AppConstants.api + '/departments',
                params: searchData
            }).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get(AppConstants.api + '/departments/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function Create(department) {
            return $http.post(AppConstants.api + '/departments', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put(AppConstants.api + '/departments', user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete(AppConstants.api + '/departments/' + id).then(handleSuccess, handleError('Error deleting user'));
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
