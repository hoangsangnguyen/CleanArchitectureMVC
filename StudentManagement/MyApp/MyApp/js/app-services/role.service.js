(function () {
    'use strict';

    angular
        .module('helloApp')
        .factory('RoleService', RoleService);

    RoleService.$inject = ['$http', 'AppConstants'];
    function RoleService($http, AppConstants) {
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
                url: AppConstants.api + '/roles',
                params: searchData
            }).then(handleSuccess, handleError('Error getting all roles'));
        }

        function GetById(id) {
            return $http.get(AppConstants.api + '/roles/' + id).then(handleSuccess, handleError('Error getting role by id'));
        }

        function Create(role) {
            return $http.post(AppConstants.api + '/roles', role).then(handleSuccess, handleError('Error creating role'));
        }

        function Update(role) {
            return $http.put(AppConstants.api + '/roles', role).then(handleSuccess, handleError('Error updating role'));
        }

        function Delete(id) {
            return $http.delete(AppConstants.api + '/roles/' + id).then(handleSuccess, handleError('Error deleting role'));
        }

        function GetViewModels() {
            return $http.get(AppConstants.api + '/roles/viewmodel').then(handleSuccess, handleError('Error getting role'));
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
