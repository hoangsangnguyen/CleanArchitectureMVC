// Create the module where our functionality can attach to
let layoutModule = angular.module('app.layout', []);

// Components
let AppHeader = import('./header.component.js');
layoutModule.component('appHeader', AppHeader);

let AppFooter = import('./footer.component.js');
layoutModule.component('appFooter', AppFooter);
