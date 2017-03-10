userService.$inject = ['$http', 'auth', 'storageService']

export default function userService($http, auth, storage) {
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
  }

  return user;
}
