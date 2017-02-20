//////////////////////////////////////////////////

import angular from 'angular';
import angularRouter from 'angular-ui-router';

////Controllers////

import HomeController from './components/home/homeController';
import CategoriesController from './components/categories/categoriesController'
import AuthController from './components/auth/authController';

////Services////

import categoriesService from './components/categories/categoriesService';
import authService from './components/auth/authService';

////Directives////

import {
  selectableDirective,
  categoryOptions,
  categoryToggle,
  modalShow,
  modalHide,
  toggleDirective
} from './directives'

import categoriesDirective from './components/categories/categoriesDirective'

//// Assets /////

import style from './assets/stylesheets/main.scss';

////Config//////

import mainConfig from './config';

/////////////////////////////////////////////////////////

angular.module('wunderlist', [angularRouter])
  .config(mainConfig)
  .controller('HomeController', HomeController)
  .controller('CategoriesController', CategoriesController)
  .controller('AuthController', AuthController)
  .directive('selectableDirective', () => new selectableDirective())
  .directive('categoryOptions', () => new categoryOptions())
  .directive('categoryToggle', () => new categoryToggle())
  .directive('modalShow', () => new modalShow())
  .directive('modalHide', () => new modalHide())
  .directive('toggleDirective', () => new toggleDirective())
  .directive('categoriesDirective', function() {
    return {
      templateUrl: './components/categories/categories.html',
    }
  })
  .factory('categoriesService', categoriesService)
