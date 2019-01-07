(function () {
    'use strict';

    angular
        .module('helloApp')
        .factory('ClassService', ClassService);

    ClassService.$inject = ['$http', 'AppConstants'];
    function ClassService($http, AppConstants) {
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
                url: AppConstants.api + '/classes',
                params: searchData
            }).then(handleSuccess, handleError('Error getting all classes'));
        }

        function GetById(id) {
            return $http.get(AppConstants.api + '/classes/' + id).then(handleSuccess, handleError('Error getting class by id'));
        }

        function Create(classDto) {
            return $http.post(AppConstants.api + '/classes', classDto).then(handleSuccess, handleError('Error creating class'));
        }

        function Update(classDto) {
            return $http.put(AppConstants.api + '/classes', classDto).then(handleSuccess, handleError('Error updating class'));
        }

        function Delete(id) {
            return $http.delete(AppConstants.api + '/classes/' + id).then(handleSuccess, handleError('Error deleting class'));
        }

        function GetViewModels() {
            return $http.get(AppConstants.api + '/classes/viewmodel').then(handleSuccess, handleError('Error getting class'));
        }

        // private functions

        function handleSuccess(res) {
            console.log('Success');
            return res.data;
        }

        function handleError(error) {
            console.log('Error');
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
