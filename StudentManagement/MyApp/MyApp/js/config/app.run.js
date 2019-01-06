function AppRun() {
<<<<<<< HEAD
    'ngInject';

     //change page title based on state
    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $rootScope.setPageTitle(toState.title);
    });

    // Helper method for setting the page's title
    $rootScope.setPageTitle = (title) => {
        $rootScope.pageTitle = '';
        if (title) {
            $rootScope.pageTitle += title;
            $rootScope.pageTitle += ' \u2014 ';
        }
        $rootScope.pageTitle += AppConstants.appName;
    };

}

export default AppRun;
=======
    //'ngInject';

    // change page title based on state
    //$rootScope.$on('$stateChangeSuccess', (event, toState) => {
    //    $rootScope.setPageTitle(toState.title);
    //});

    //// Helper method for setting the page's title
    //$rootScope.setPageTitle = (title) => {
    //    $rootScope.pageTitle = '';
    //    if (title) {
    //        $rootScope.pageTitle += title;
    //        $rootScope.pageTitle += ' \u2014 ';
    //    }
    //    $rootScope.pageTitle += AppConstants.appName;
    //};

}

//export default AppRun;
>>>>>>> 0a9a0109244b9850d7aa04f08ba85e6791359475
