export default function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      // abstract: true,
      templateUrl: '../components/home/home.html',
      controller: 'HomeController',
      // template: "<div ui-view></div>",
      resolve: {
        // todosPromise: ['todosService', function(todosService) {
        //   return todosService.getAll();
        // }],
        categoriesPromise: ['categoriesService', function(categoriesService) {
          return categoriesService.getAll();
        }]
      }
    })
  // .state('home.categories', {
  //   parent: 'home',
  //   controller: 'CategoriesController',
  //   templateUrl: '../components/categories/categories.list.html'
  // })
  $urlRouterProvider.otherwise('home');
}
