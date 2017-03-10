//////////////////////////////////////////////////

import angular from 'angular';
import angularRouter from 'angular-ui-router';

////Controllers////

import HomeController from './components/home/homeController';
import CategoriesController from './components/categories/categoriesController'
import AuthController from './components/auth/authController';
import UserController from './components/user/userController';
import StorageController from './components/storage/storageController';

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
  .run(['$rootScope', '$location', 'auth', 'userService', ($rootScope, $location, auth, user) => {
    $rootScope.$on('$stateChangeStart', function(event) {
      if (!auth.isLoggedIn()) {
        $location.path('/login');
      } else {
        user.setUser();
      }
    })
  }])
  .controller('HomeController', HomeController)
  .controller('AuthController', AuthController)
  .controller('CategoriesController', CategoriesController)
  .controller('UserController', UserController)
  .controller('StorageController', StorageController)
  .directive('selectableDirective', () => new selectableDirective())
  .directive('categoryOptions', () => new categoryOptions())
  .directive('categoryToggle', () => new categoryToggle())
  .directive('modalShow', () => new modalShow())
  .directive('modalHide', () => new modalHide())
  .directive('toggleDirective', () => new toggleDirective())
  .directive('sortableList', () => new sortableList())
  .directive('categoriesDirective', () => {
    return {
      templateUrl: './components/categories/categories.html'
    }
  })
  .factory('categoriesService', categoriesService)
  .factory('auth', authService)
  .factory('userService', userService)
  .factory('storageService', storageService)
