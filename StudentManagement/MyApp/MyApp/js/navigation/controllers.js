/* global angular */
(function () {
    "use strict";
    var app = angular.module('helloApp')
        .controller('navigationCtrl', NavigationController);

    NavigationController.$inject = ['$scope', '$location', '$window', '$rootScope', 'AuthenticationService'];
    function NavigationController($scope, $location, $window, $rootScope, AuthenticationService) {
        $(document).ready(function () {
            var currentUser = $window.localStorage.getItem('currentUser');
            if (currentUser == null) {
                initViewBeforeLogin();
            } else {
                initViewAfterLogin(currentUser);
            }
        });

        $rootScope.$on("LoginSucceed", function () {
            var currentUser = $window.localStorage.getItem('currentUser');
            initViewAfterLogin(currentUser);
            $location.path('/');
        });

        function initViewAfterLogin(currentUser) {
            currentUser = JSON.parse(currentUser);
            $scope.isLogin = true;
            $scope.isAdmin = JSON.parse(currentUser.Meta.Role).SystemName === 'admin';
            $scope.currentUser = currentUser;
        }

        function initViewBeforeLogin() {
            $scope.isLogin = false;
        }

        $scope.onLogout = function () {
            initViewBeforeLogin();
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        };

        $scope.IsRouteActive = function (routePath) {
            return routePath === $location.path();
        };
    }
})();
