import angular from 'angular';
import angularRouter from 'angular-ui-router';
import homeController from './components/home/homeController';
// import todosController from './components/todos/todosController';
import categoriesController from './components/categories/categoriesController'

// import $ from 'jquery';

import categoriesService from './components/categories/categoriesService';
import todosService from './components/todos/todosService';

import mainConfig from './config';
import style from './assets/stylesheets/main.scss';
window.$ = $;
// import application from './assets/javascripts/application';

const app = angular.module('wunderlist', [angularRouter])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    return new mainConfig($stateProvider, $urlRouterProvider)
  }])
  .controller('HomeController', ['$scope', 'todosService', function($scope, todosService) {
    return new homeController($scope, todosService)
  }])
  // .controller('TodosController', ['$scope', 'todosService', function($scope, todosService) {
  //   return new todosController($scope, todosService)
  // }])
  .controller('CategoriesController', ['$scope', 'categoriesService', function($scope, categoriesService) {
    return new categoriesController($scope, categoriesService);
  }])
  .factory('categoriesService', ['$http', function($http) {
    return new categoriesService($http);
  }])
  .service('todosService', ['$http', function($http) {
    return new todosService($http);
  }])
