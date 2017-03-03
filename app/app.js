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
  .controller('AuthController', AuthController)
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
  .controller('AuthController', [
    '$scope',
    '$state',
    'auth',
    function($scope, $state, auth) {
      $scope.register = function() {
        auth.register($scope.user).then(function() {
          $state.go('home');
        }, function(error) {
          $scope.error = error;
        });
      };

      $scope.logIn = function() {
        auth.logIn($scope.user).then(function() {
          $state.go('home');
        }, function(error) {
          $scope.error = error;
        });
      };
    }
  ])
  .factory('auth', ['$http', '$window', '$location', function($http, $window, $location) {
    var auth = {
      user: {}
    };

    auth.saveToken = function(token) {
      $window.localStorage['app-auth-token'] = token;
    }

    auth.getToken = function() {
      return $window.localStorage['app-auth-token'];
    }


    auth.saveUser = (user) => {
      $window.localStorage.setItem('user-obj', JSON.stringify(user));
    }

    auth.getUser = function() {
      return JSON.parse($window.localStorage.getItem('user-obj'));
    }

    auth.isLoggedIn = function() {
      var token = auth.getToken();
      if (token && token != 'undefined') {
        var payload = JSON.parse($window.atob(token.split('.')[1]))
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    }

    auth.currentUser = function() {
      if (auth.isLoggedIn()) {
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    }

    auth.register = function(user) {
      return $http.post('/register', user).then(function(success) {
        auth.saveUser(success.data.user.local)
        auth.saveToken(success.data.token);
      }, function(error) {
        console.log(error)
      });
    };

    auth.logIn = function(user) {
      return $http.post('/login', user).then(function(success) {
        auth.saveUser(success.data.user.local)
        auth.saveToken(success.data.token);
      });
    };

    auth.logOut = function() {
      $window.localStorage.removeItem('app-auth-token');
      $location.path('/home')
    };

    return auth;
  }])
