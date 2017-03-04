AuthController.$inject = ['$scope', '$state', 'auth']

export default function AuthController($scope, $state, auth) {
  this.register = function() {
    auth.register($scope.user).then(function() {
      $state.go('home');
    }, function(error) {
      $scope.error = error;
    });
  };

  this.logFacebook = () => {
    auth.logFacebook()
  }

  this.logIn = function() {
    auth.logIn($scope.user).then(function() {
      $state.go('home');
    }, function(error) {
      $scope.error = error;
    });
  };
}
