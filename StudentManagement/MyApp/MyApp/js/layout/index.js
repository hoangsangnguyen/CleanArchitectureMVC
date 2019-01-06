// Create the module where our functionality can attach to
let layoutModule = angular.module('app.layout', []);

// Components
let AppHeader = import('./header.component.js');
layoutModule.component('appHeader', AppHeader);

let AppFooter = import('./footer.component.js');
layoutModule.component('appFooter', AppFooter);
<<<<<<< HEAD

layoutModule;
=======
>>>>>>> 0a9a0109244b9850d7aa04f08ba85e6791359475
