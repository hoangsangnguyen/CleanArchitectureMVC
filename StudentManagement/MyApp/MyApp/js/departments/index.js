//var departmentListController = import('./department.list.controllers.js');
//var departmentCreateController = import('./department.create.controller.js');
//var departmentEditController = import('./department.edit.controller.js');

import departmentListModule from './department.list.controllers';
import departmentCreateModule from './department.list.controllers';
import departmentEditModule from './department.edit.controllers';


var app = angular.module('department.controller', [departmentListModule, departmentCreateModule, departmentEditModule]);
app.controller('DepartmentListController', function () { departmentListController });
app.controller('DepartmentCreateController', function () { departmentListController });
app.controller('DepartmentEditController', function () { departmentListController });
