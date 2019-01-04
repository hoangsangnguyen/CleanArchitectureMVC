'use strict';

angular.module('Authentication')

    .factory('AuthenticationService', ['$http', '$rootScope', function ($http, $rootScope) {
        var service = {};

        service.Login = function (userName, password, callback) {
            $http.post()
        }
    }])