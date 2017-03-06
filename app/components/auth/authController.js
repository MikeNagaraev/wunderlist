AuthController.$inject = ['$scope', '$state', 'auth']

export default function AuthController($scope, $state, auth) {
  this.register = function() {
    auth.register($scope.user)
  };

  this.logFacebook = () => {
    auth.logFacebook()
  }

  this.logIn = function() {
    auth.logIn($scope.user)
  };
}
