export default function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '../components/home/home.html',
      controller: 'HomeController',
      resolve: {
        todosPromise: ['todosService', function(todosService) {
          return todosService.getAll();
        }]
      }
    })
  $urlRouterProvider.otherwise('home');
}
