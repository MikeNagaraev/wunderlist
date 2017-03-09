storageService.$inject = ['$window']

export default function storageService($window) {
  const storage = {
    categories: [],
    user: {}
  };

  storage.setLocalStorage = (key, item) => {
    $window.localStorage.setItem(key, JSON.stringify(item));
  }

  storage.getLocalStorage = (key) => {
    return JSON.parse($window.localStorage.getItem(key));
  }

  storage.saveCategories = (categories) => {
    angular.copy(categories, storage.categories)
    storage.setLocalStorage('categories', storage.categories);
  }

  storage.saveCategory = (category) => {
    let pos = storage.getIdInList(storage.categories, category.id);
    if (pos >= 0) {
      storage.categories[pos] = category;
    } else {
      storage.categories.push(category);
    }
    storage.setLocalStorage('categories', storage.categories);
  }

  storage.getCategory = (id) => {
    let pos = storage.getIdInList(storage.categories, id);
    if (pos >= 0) {
      return storage.categories[pos];
    } else {
      return -1;
    }
  }

  storage.deleteCategory = (id) => {
    let pos = storage.getIdInList(storage.categories, id);
    if (pos >= 0) {
      storage.categories.splice(pos, 1);
    } else {
      return -1;
    }
    storage.setLocalStorage('categories', storage.categories);
  }

  storage.deleteAllCategories = () => {
    storage.clearList(storage.categories);
    storage.setLocalStorage('categories', storage.categories);
  }


  storage.getAllCategories = () => {
    angular.copy(storage.getLocalStorage('categories'), storage.categories);
    return storage.categories;
  }

  storage.getIdInList = (list, id) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  storage.clearList = (list) => {
    list.splice(0, list.length);
  }
  return storage;
}
