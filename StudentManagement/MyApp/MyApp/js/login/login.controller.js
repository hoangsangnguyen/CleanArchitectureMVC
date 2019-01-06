(function () {
    'use strict';

    angular
        .module('helloApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$rootScope'];
    function LoginController($location, AuthenticationService, FlashService, $rootScope) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                console.log('response ', response.status);
                if (response.status == 200) {
                    AuthenticationService.SetCredentials(response.data);
                    $rootScope.$emit("LoginSucceed", {});

                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }


})();
