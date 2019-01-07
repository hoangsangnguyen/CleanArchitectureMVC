(function () {
    'use strict';

    angular
        .module('helloApp')
        .factory('ScoreService', ScoreService);

    ScoreService.$inject = ['$http', 'AppConstants'];
    function ScoreService($http, AppConstants) {
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
                url: AppConstants.api + '/scores',
                params: searchData
            }).then(handleSuccess, handleError('Error getting all scores'));
        }

        function GetById(studentId, subjectId) {
            return $http.get(AppConstants.api + '/scores/' + studentId + '/' + subjectId).then(handleSuccess, handleError('Error getting score by id'));
        }

        function Create(score) {
            return $http.post(AppConstants.api + '/scores', score).then(handleSuccess, handleError('Error creating score'));
        }

        function Update(score) {
            return $http.put(AppConstants.api + '/scores', score).then(handleSuccess, handleError('Error updating score'));
        }

        function Delete(studentId, subjectId) {
            return $http.delete(AppConstants.api + '/scores/' + studentId + '/' + subjectId).then(handleSuccess, handleError('Error deleting score'));
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
