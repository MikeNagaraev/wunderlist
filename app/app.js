import angular from 'angular';
import angularRouter from 'angular-ui-router';
import homeController from './components/home/homeController';
import todosController from './components/todos/todosController';
import todosService from './components/todos/todosService';
import mainConfig from './config';
import style from './assets/stylesheets/main.scss';
import $ from 'jquery';
window.$ = $;
// import application from './assets/javascripts/application';

const app = angular.module('wunderlist', [angularRouter])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    return new mainConfig($stateProvider, $urlRouterProvider)
  }])
  .controller('HomeController', ['$scope', 'todosService', function($scope, todosService) {
    return new homeController($scope, todosService)

  }])
  .controller('TodosController', ['$scope', 'todosService', function($scope, todosService) {
    return new todosController($scope, todosService)
  }])
  .factory('todosService', ['$http', function($http) {
    return new todosService($http);
  }])
