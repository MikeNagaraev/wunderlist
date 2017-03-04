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

////Directives////

import {
  selectableDirective,
  categoryOptions,
  categoryToggle,
  modalShow,
  modalHide,
  toggleDirective,
  sortableList
} from './directives'

import categoriesDirective from './components/categories/categoriesDirective'

//// Assets /////

import style from './assets/stylesheets/main.scss';

////Config//////

import mainConfig from './config';

/////////////////////////////////////////////////////////

angular.module('wunderlist', [angularRouter])
  .config(mainConfig)
  .run(['$rootScope', '$location', 'auth', ($rootScope, $location, auth) => {
    $rootScope.$on('$stateChangeStart', function(event) {
      if (!auth.isLoggedIn()) {
        $location.path('/auth');
      }
    })
  }])
  .controller('HomeController', HomeController)
  .controller('CategoriesController', CategoriesController)
  .controller('UserController', UserController)
  .directive('selectableDirective', () => new selectableDirective())
  .directive('categoryOptions', () => new categoryOptions())
  .directive('categoryToggle', () => new categoryToggle())
  .directive('modalShow', () => new modalShow())
  .directive('modalHide', () => new modalHide())
  .directive('toggleDirective', () => new toggleDirective())
  .directive('sortableList', () => new sortableList())
  .directive('categoriesDirective', function() {
    return {
      templateUrl: './components/categories/categories.html',
    }
  })
  .factory('categoriesService', categoriesService)
  .controller('AuthController', AuthController)
  .factory('auth', authService)
  .factory('userService', userService)
