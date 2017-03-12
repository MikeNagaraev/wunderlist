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
    storage.categories = JSON.parse($window.localStorage.getItem(storage.localStorageCategoriesKey));
    console.log('storage categories', storage.categories)
  }

  storage.update = () => {
    $window.localStorage.setItem(storage.localStorageCategoriesKey, JSON.stringify(storage.categories));
    console.log('storage update', storage.categories)
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

  storage.remove = (list, id) => {
    let pos = storage.getIdInList(list, id);
    if (pos >= 0) {
      list.splice(pos, 1);
    } else {
      return -1;
    }
  }

  storage.getIdInList = (list, id) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return i;
      }
    }
    return -1;
  }



  // storage.setLocalStorage = (key, item) => {
  //   $window.localStorage.setItem(key, JSON.stringify(item));
  // }
  //
  // storage.getLocalStorage = (key) => {
  //   return JSON.parse($window.localStorage.getItem(key));
  // }
  //
  // storage.saveCategories = (categories) => {
  //   categories.forEach(category => {
  //     storage.saveCategory(category);
  //   })
  // }
  //
  // storage.saveCategory = (category) => {
  //   let pos = storage.getIdInList(storage.categories, category.id);
  //   if (pos >= 0) {
  //     storage.categories[pos] = category;
  //   } else {
  //     storage.categories.push(category);
  //   }
  //   storage.setLocalStorage('categories', storage.categories);
  // }
  //
  // storage.getCategory = (id) => {
  //   let pos = storage.getIdInList(storage.categories, id);
  //   if (pos >= 0) {
  //     return storage.categories[pos];
  //   } else {
  //     return -1;
  //   }
  // }
  //
  // storage.deleteCategory = (id) => {
  //   let pos = storage.getIdInList(storage.categories, id);
  //   if (pos >= 0) {
  //     storage.categories.splice(pos, 1);
  //   } else {
  //     return -1;
  //   }
  //   storage.setLocalStorage('categories', storage.categories);
  // }
  //
  // storage.deleteAllCategories = () => {
  //   storage.clearList(storage.categories);
  //   storage.setLocalStorage('categories', storage.categories);
  // }
  //
  //
  // storage.getAllCategories = () => {
  //   angular.copy(storage.getLocalStorage('categories'), storage.categories);
  //   return storage.categories;
  // }
  //
  // storage.getIdInList = (list, id) => {
  //   for (let i = 0; i < list.length; i++) {
  //     if (list[i].id === id) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }
  //
  // storage.clearList = (list) => {
  //   list.splice(0, list.length);
  // }
  return storage;
}
