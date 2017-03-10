MainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function MainConfig($stateProvider, $urlRouterProvider) {
  let home = {
    name: 'home',
    url: '/home',
    templateUrl: '../components/home/home.html',
    controller: 'HomeController',
    controllerAs: 'home',
    resolve: {
      promise: ['categoriesService', (categoriesService) => {
        categoriesService.setAll();
      }]
    }
  }

  let categories = {
    name: 'home.categories',
    url: '/categories/{id}',
    controller: 'CategoriesController',
    controllerAs: 'category',
    templateUrl: '../components/categories/category.html',
    resolve: {
      promise: ['$stateParams', 'categoriesService', function($stateParams, categoriesService) {
        return categoriesService.setCurrentCategory($stateParams.id);
      }]
    }
  }

  let login = {
    name: 'login',
    url: '/login',
    templateUrl: '../components/auth/login.html',
    controller: 'AuthController',
    controllerAs: 'auth'
  }

  let register = {
    name: 'register',
    url: '/register',
    templateUrl: '../components/auth/register.html',
    controller: 'AuthController',
    controllerAs: 'auth'
  }

  let logFacebook = {
    name: 'logFacebook',
    url: '/auth/facebook',
    controller: 'AuthController',
    controllerAs: 'auth'
  }

  let authIndex = {
    name: 'authIndex',
    url: '/auth',
    templateUrl: '../components/auth/index.html',
    controller: 'AuthController',
    controllerAs: 'auth'
  }

  let profile = {
    name: 'profile',
    url: '/profile',
    templateUrl: '../components/user/profile.html',
    controller: 'UserController',
    controllerAs: 'user'
  }

  $stateProvider
    .state(home)
    .state(categories)
    .state(authIndex)
    .state(login)
    .state(logFacebook)
    .state(profile)
    .state(register)

  $urlRouterProvider.otherwise('home');
}
