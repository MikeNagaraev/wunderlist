//////////////////////////////////////////////////

import angular from 'angular';
import angularRouter from 'angular-ui-router';

////Controllers////

import HomeController from './components/home/homeController';
import CategoriesController from './components/categories/categoriesController'
import AuthController from './components/auth/authController';
import UserController from './components/user/userController';

////Services////

import categoriesService from './components/categories/categoriesService';
import authService from './components/auth/authService';
import userService from './components/user/userService';
import storageService from './components/storage/storageService';

////Directives////

import {
  selectableDirective,
  categoryOptions,
  categoryToggle,
  modalShow,
  modalEdit,
  modalHide,
  toggleDirective,
  sortableList,
  datePicker
} from './directives'

import {
  newCategoryPopUp,
  editCategoryPopUp,
  categoriesList
} from './components/categories/categoriesDirectives'

import addTodoForm from './components/todos/addTodoFormDirective'

//// Assets /////

import style from './assets/stylesheets/main.scss';

////Config//////

import routerConfig from './config/routerConfig';
import mainConfig from './config/mainConfig';

/////////////////////////////////////////////////////////

angular.module('wunderlist', [angularRouter])
  .run(mainConfig)

  .config(routerConfig)

  .controller('HomeController', HomeController)
  .controller('AuthController', AuthController)
  .controller('CategoriesController', CategoriesController)
  .controller('UserController', UserController)

  .directive('selectableDirective', () => new selectableDirective())
  .directive('categoryOptions', () => new categoryOptions())
  .directive('categoryToggle', () => new categoryToggle())
  .directive('modalShow', () => new modalShow())
  .directive('modalEdit', () => new modalEdit())
  .directive('modalHide', () => new modalHide())
  .directive('datePicker', () => new datePicker())
  .directive('toggleDirective', () => new toggleDirective())
  .directive('sortableList', () => new sortableList())
  .directive('newCategoryPopUp', () => new newCategoryPopUp())
  .directive('editCategoryPopUp', () => new editCategoryPopUp())
  .directive('categoriesList', () => new categoriesList())
  .directive('addTodoForm', () => new addTodoForm())

  .factory('categoriesService', categoriesService)
  .factory('auth', authService)
  .factory('userService', userService)
  .factory('storageService', storageService)
