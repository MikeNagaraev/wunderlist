routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routerConfig($stateProvider, $urlRouterProvider) {
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

  let profile = {
    name: 'profile',
    url: '/profile',
    templateUrl: '../components/user/profile.html',
    controller: 'UserController',
    controllerAs: 'user'
  }

  let editProfile = {
    name: 'editProfile',
    url: '/profile/edit',
    templateUrl: '../components/user/edit.html',
    controller: 'UserController',
    controllerAs: 'user'
  }

  $stateProvider
    .state(home)
    .state(categories)
    .state(login)
    .state(profile)
    .state(editProfile)
    .state(register)

  $urlRouterProvider.otherwise('home');
}
