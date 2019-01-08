(function () {
    'use strict';

    angular
        .module('helloApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', 'AuthenticationService', 'FlashService', '$rootScope'];
    function LoginController($scope, $location, AuthenticationService, FlashService, $rootScope) {
        $(document).ready(function () {
            // reset login status
            AuthenticationService.ClearCredentials();
        });

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                console.log('response ', response.status);
                if (response.status == 200) {
                    AuthenticationService.SetCredentials(response.data);
                    $rootScope.$emit("LoginSucceed", {});

                } else {
                    FlashService.Error(response.message);
                    $scope.dataLoading = false;
                }
            });
        };
    }
})();
