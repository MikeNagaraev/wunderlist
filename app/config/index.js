MainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function MainConfig($stateProvider, $urlRouterProvider) {
  let home = {
    name: 'home',
    url: '/home',
    templateUrl: '../components/home/home.html',
    controller: 'HomeController',
    resolve: {
      categoriesPromise: ['categoriesService', function(categoriesService) {
        return categoriesService.getAll();
      }]
    }
    //to Controller get all
    // $.deffer()
  }

  let categories = {
    name: 'home.categories',
    url: '/categories/:id',
    controller: 'CategoriesController',
    controllerAs: 'category',
    templateUrl: '../components/categories/category.html'
  }

  // let category = {
  //   name: 'home.catcategory',
  //   url: 'categories/:id',
  //   controller: 'CategoriesController',
  // }

  let login = {
    name: 'login',
    url: '/login',
    templateUrl: '../components/auth/login.html',
    controller: 'AuthController'
  }

  let register = {
    name: 'registration',
    url: '/register',
    templateUrl: '../components/auth/register.html',
    controller: 'AuthController'
  }

  $stateProvider
    .state(home)
    .state(categories)
    // .state(category)
    .state(login)
    .state(register)

  $urlRouterProvider.otherwise('home');
}
