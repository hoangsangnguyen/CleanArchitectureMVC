(function () {
    'use strict';

    angular
        .module('helloApp')
        .factory('TeacherService', TeacherService);

    TeacherService.$inject = ['$http', 'AppConstants'];
    function TeacherService($http, AppConstants) {
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
                url: AppConstants.api + '/teachers',
                params: searchData
            }).then(handleSuccess, handleError('Error getting all teachers'));
        }

        function GetById(id) {
            return $http.get(AppConstants.api + '/teachers/' + id).then(handleSuccess, handleError('Error getting teacher by id'));
        }

        function Create(teacher) {
            return $http.post(AppConstants.api + '/teachers', teacher).then(handleSuccess, handleError('Error creating teacher'));
        }

        function Update(teacher) {
            return $http.put(AppConstants.api + '/teachers', teacher).then(handleSuccess, handleError('Error updating teacher'));
        }

        function Delete(id) {
            return $http.delete(AppConstants.api + '/teachers/' + id).then(handleSuccess, handleError('Error deleting teacher'));
        }

        function GetViewModels() {
            return $http.get(AppConstants.api + '/teachers/viewmodel').then(handleSuccess, handleError('Error getting teacher'));
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
