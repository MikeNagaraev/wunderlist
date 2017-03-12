userService.$inject = ['$http', 'auth', 'storageService', '$location']

export default function userService($http, auth, storage, $location) {
  const user = {
    info: {} //cause we loose methods
  }

  user.saveUser = () => {
    storage.saveUser(user.info);
  }

  user.getUser = () => {
    return storage.getUser();
  }

  user.setUser = () => {
    angular.copy(storage.getUser(), user.info)
  };

  user.updateUser = () => {
    $http.put('/users/' + user.info._id, user.info)
      .then(success => {
        angular.copy(success.data, user.info)
        user.saveUser(user.info)
        $location.path('/profile')
      })
  }

  return user;
}
