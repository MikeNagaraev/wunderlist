userService.$inject = ['$http', 'auth']

export default function userService($http, auth) {
  const user = {
    info: {}
  }

  user.set = () => {
    angular.copy(auth.getUser(), user.info)
  };

  return user;
}
