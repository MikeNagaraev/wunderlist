storageService.$inject = ['$window']

export default function storageService($window) {
  const storage = {
    categories: {
      create: [],
      update: [],
      delete: []
    },
    localStorageCategoriesKey: 'categories',
    localStorageUserKey: 'user-obj'
  };

  storage.init = () => {
    angular.copy(JSON.parse($window.localStorage.getItem(storage.localStorageCategoriesKey)), storage.categories);
  }
  storage.update = () => {
    $window.localStorage.setItem(storage.localStorageCategoriesKey, JSON.stringify(storage.categories));
  }

  storage.removeItem = (key) => {
    $window.localStorage.removeItem(key);
  }

  storage.saveToken = function(token) {
    $window.localStorage[storage.localStorageTokenKey] = token;
  }

  storage.getToken = function() {
    return $window.localStorage[storage.localStorageTokenKey];
  }

  storage.saveUser = (user) => {
    $window.localStorage.setItem(storage.localStorageUserKey, JSON.stringify(user));
  }

  storage.getUser = function() {
    let user = JSON.parse($window.localStorage.getItem(storage.localStorageUserKey));
    return user;
  }

  storage.remove = (list, id, listOfId) => {
    let pos = storage.getIdInList(list, id, listOfId);
    if (pos >= 0) {
      list.splice(pos, 1);
    } else {
      return -1;
    }
  }

  storage.getIdInList = (list, id, listOfId) => {
    if (!listOfId) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === id) {
          return i;
        }
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          return i;
        }
      }
    }
    return -1;
  }

  return storage;
}
