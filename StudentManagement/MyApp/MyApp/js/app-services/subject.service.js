(function () {
    'use strict';

    angular
        .module('helloApp')
        .factory('SubjectService', SubjectService);

    SubjectService.$inject = ['$http', 'AppConstants'];
    function SubjectService($http, AppConstants) {
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
                url: AppConstants.api + '/subjects',
                params: searchData
            }).then(handleSuccess, handleError('Error getting all subjects'));
        }

        function GetById(id) {
            return $http.get(AppConstants.api + '/subjects/' + id).then(handleSuccess, handleError('Error getting subject by id'));
        }

        function Create(subject) {
            return $http.post(AppConstants.api + '/subjects', subject).then(handleSuccess, handleError('Error creating subject'));
        }

        function Update(subject) {
            return $http.put(AppConstants.api + '/subjects', subject).then(handleSuccess, handleError('Error updating subject'));
        }

        function Delete(id) {
            return $http.delete(AppConstants.api + '/subjects/' + id).then(handleSuccess, handleError('Error deleting subject'));
        }

        function GetViewModels() {
            return $http.get(AppConstants.api + '/subjects/viewmodel').then(handleSuccess, handleError('Error getting subject'));
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
