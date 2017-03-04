authServise.$inject = ['$http', '$window', '$location']
export default function authServise($http, $window, $location) {
  var auth = {
    user: {}
  };

  auth.saveToken = function(token) {
    $window.localStorage['app-auth-token'] = token;
  }

  auth.getToken = function() {
    return $window.localStorage['app-auth-token'];
  }


  auth.saveUser = (user) => {
    $window.localStorage.setItem('user-obj', JSON.stringify(user));
  }

  auth.getUser = function() {
    return JSON.parse($window.localStorage.getItem('user-obj'));
  }

  auth.isLoggedIn = function() {
    var token = auth.getToken();
    if (token && token != 'undefined') {
      var payload = JSON.parse($window.atob(token.split('.')[1]))
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  auth.currentUser = function() {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  }

  auth.logFacebook = () => {
    $http.get($window.location.protocol + "//" + $window.location.host + $window.location.pathname + "auth/facebook");
  }

  auth.register = function(user) {
    return $http.post('/register', user).then(function(success) {
      auth.saveUser(success.data.user.local)
      auth.saveToken(success.data.token);
    }, function(error) {
      console.log(error)
    });
  };

  auth.logIn = function(user) {
    return $http.post('/login', user).then(function(success) {
      auth.saveUser(success.data.user.local)
      auth.saveToken(success.data.token);
    });
  };

  auth.logOut = function() {
    $window.localStorage.removeItem('app-auth-token');
    $location.path('/home')
  };

  return auth;
}
