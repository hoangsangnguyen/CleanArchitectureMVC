(function () {
    'use strict';

    angular
        .module('helloApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'AppConstants'];
    function UserService($http, AppConstants) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.UpdateUserAndRole = UpdateUserAndRole;
        service.Delete = Delete;
        service.GetViewModels = GetViewModels;

        return service;

        function GetAll(searchData) {
            return $http({
                method: 'GET',
                url: AppConstants.api + '/users',
                params: searchData
            }).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get(AppConstants.api + '/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function Create(user) {
            return $http.post(AppConstants.api + '/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put(AppConstants.api + '/users', user).then(handleSuccess, handleError('Error updating user'));
        }

        function UpdateUserAndRole(user) {
            return $http.put(AppConstants.api + '/users/updateUserAndRole', user).then(handleSuccess, handleError('Error updating user and role'));
        }

        function Delete(id) {
            return $http.delete(AppConstants.api + '/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function GetViewModels() {
            return $http.get(AppConstants.api + '/users/viewmodel').then(handleSuccess, handleError('Error getting user'));
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
