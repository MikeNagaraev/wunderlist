authServise.$inject = ['$http', '$window', '$location', '$state', 'storageService']
export default function authServise($http, $window, $location, $state, storage) {
  var auth = {};

  auth.isLoggedIn = function() {
    console.log(storage)
    var user = storage.getUser();
    if (user && user != 'undefined') {
      console.log('true')
      return true;
    } else {
      return false;
    }
  }
  //
  // auth.currentUser = function() {
  //   if (auth.isLoggedIn()) {
  //     var token = auth.getToken();
  //     var payload = JSON.parse($window.atob(token.split('.')[1]));
  //
  //     return payload.name;
  //   }
  // }

  auth.logFacebook = () => {
    // $http.get($window.location.protocol + "//" + $window.location.host + $window.location.pathname + "auth/facebook");
  }

  auth.register = function(user) {
    return $http.post('/register', user).then(function(success) {
      storage.saveUser(success.data.user)
      $state.go('home')
    }, function(error) {
      console.log(error)
    });
  };

  auth.logIn = function(user) {
    console.log(user)
    return $http.post('/login', user).then(function(success) {
      storage.saveUser(success.data.user)
      $state.go('home')
    });
  };

  auth.logOut = function() {
    storage.removeItem(storage.localStorageUserKey)
    $location.path('/home')
  };

  return auth;
}
