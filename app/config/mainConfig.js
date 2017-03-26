MainConfig.$inject = ['$rootScope', '$location', 'auth', 'userService'];

export default function MainConfig($rootScope, $location, auth, user) {
  $rootScope.$on('$stateChangeStart', function(event) {
    if (!auth.isLoggedIn()) {
      $location.path('/login');
    } else {
      user.setUser();
    }
  })
}
