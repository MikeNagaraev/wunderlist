export default function($stateProvider, $urlRouterProvider) {
  // let home = {
  //   name: 'home',
  //   url: '/home',
  //   templateUrl: '../components/home/home.html',
  //   controller: 'HomeController',
  //   resolve: {
  //     categoriesPromise: ['categoriesService', function(categoriesService) {
  //       return categoriesService.getAll();
  //     }]
  //   },
  //   views: {
  //     'categories': {
  //       templateUrl: '../components/categories/categories.list.html',
  //       controller: function() {
  //
  //       }
  //     }
  //   }
  // }
  //
  // let categoriesList = {
  //   name: 'categories.list',
  //   parent: home,
  //   controller: 'CategoriesController',
  //   templateUrl: '../components/categories/categories.list.html'
  // }
  let home = {
    name: 'home',
    url: '/home',
    templateUrl: '../components/home/home.html',
    controller: 'HomeController',
    resolve: {
      categoriesPromise: ['categoriesService', function(categoriesService) {
        return categoriesService.getAll();
      }]
    },
    params: {
        autoActivateChild: 'home.categories'
    }
  }

  let categoriesList = {
    name: 'home.categories',
    parent: home,
    controller: 'CategoriesController',
    templateUrl: '../components/categories/categories.list.html'
  }

  $stateProvider
    .state(home)
    .state(categoriesList)

  $urlRouterProvider.otherwise('home');
}
