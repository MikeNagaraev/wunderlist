import angular from 'angular';
import angularRouter from 'angular-ui-router';
import homeController from './components/home/homeController';
// import todosController from './components/todos/todosController';
import categoriesController from './components/categories/categoriesController'

import categoriesService from './components/categories/categoriesService';
import todosService from './components/todos/todosService';

import mainConfig from './config';
import style from './assets/stylesheets/main.scss';
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
  .directive("selectableDirective", function() {
    return {
      controller: ($scope, $element) => {
        $scope.selectCategory = () => {
          $scope.resetSelectedCategories();
          if ($element.hasClass('category-item')) {
            if ($element.hasClass('selected')) {
              return;
            } else {
              $element.addClass('selected');
            }
          }
        }
        $scope.resetSelectedCategories = () => {
          $('.category-item').removeClass('selected');
        }

        $element.click($scope.selectCategory);
      }
    }
  })
  .directive("categoryOptions", () => {
    return {
      controller: ($scope, $element) => {
        $scope.showOptions = () => {
          let toggledOption = $element.next('.category-options-container');
          if ($(toggledOption).css('display') === 'block') {
            $(toggledOption).toggle('slideDown');
          } else {
            $('.category-options-container').hide();
            $(toggledOption).toggle();
          }
        }

        $element.click($scope.showOptions);
      }
    }
  })
  .directive("categoryToggle", () => {
    return {
      controller: ($scope, $element) => {
        $scope.toggleCategoryList = () => {
          $('.categories-list').toggle();
          $element.find('.glyphicon').toggleClass('glyphicon-chevron-up')
          $element.find('.glyphicon').toggleClass('glyphicon-chevron-down')
        }

        $element.click($scope.toggleCategoryList)
      }
    }
  })
  .directive("modalShow", () => {
    return {
      controller: ($scope, $element) => {
        $scope.showCategoryWindow = () => {
          if (!$('#modal-category').hasClass('opened')) {
            $('#modal-category').addClass('opened').show();
          }
        }
        $element.click($scope.showCategoryWindow)
      }
    }
  })
  .directive("modalHide", () => {
    return {
      controller: ($scope, $element) => {
        $scope.hideCategoryWindow = () => {
          if ($('#modal-category').hasClass('opened')) {
            $('#modal-category').removeClass('opened').hide();
          }
        }
        $element.click($scope.hideCategoryWindow);
      }
    }
  })
  .directive("toggleDirective", () => {
    return {
      controller: ($scope, $element) => {
        $scope.toggleAside = () => {
          if ($element.hasClass('opened')) {
            $('.home-aside').css('width', '50px');
            $element.removeClass('opened');
            $scope.toggleHomeContainer(false);
          } else {
            $element.addClass('opened');
            $('.home-aside').css('width', '15%');
            $scope.toggleHomeContainer(true);
          }
        }

        $element.click($scope.toggleAside);

        $scope.toggleHomeContainer = flag => {
          if (flag) {
            $('.home-container').css('width', '85%');
          } else {
            $('.home-container').css('width', 'calc(100% - 50px)');
          }
        }
      }
    }
  })
