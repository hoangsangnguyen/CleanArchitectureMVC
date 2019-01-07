(function () {
    'use strict';

    angular
        .module('helloApp')
        .factory('StudentService', StudentService);

    StudentService.$inject = ['$http', 'AppConstants'];
    function StudentService($http, AppConstants) {
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
                url: AppConstants.api + '/students',
                params: searchData
            }).then(handleSuccess, handleError('Error getting all students'));
        }

        function GetById(id) {
            return $http.get(AppConstants.api + '/students/' + id).then(handleSuccess, handleError('Error getting student by id'));
        }

        function Create(student) {
            return $http.post(AppConstants.api + '/students', student).then(handleSuccess, handleError('Error creating student'));
        }

        function Update(student) {
            return $http.put(AppConstants.api + '/students', student).then(handleSuccess, handleError('Error updating student'));
        }

        function Delete(id) {
            return $http.delete(AppConstants.api + '/students/' + id).then(handleSuccess, handleError('Error deleting student'));
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
