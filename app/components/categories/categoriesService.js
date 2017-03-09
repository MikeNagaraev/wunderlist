categoriesService.$inject = ['$http', 'userService', '$location', 'storageService'];

export default function categoriesService($http, user, $location, storage) {
  const storeCategories = {
    categories: [],
    currentCategory: {}
  }

  storeCategories.getAll = () => {
    // let categories = storage.getAllCategories();
    // if (categories.length) {
    //   console.log('cat', categories)
    //   angular.copy(categories, storeCategories.categories);
    // } else {
    $http.get('users/' + user.info._id)
      .then(success => {
        angular.copy(success.data.categories, storeCategories.categories);
        storage.saveCategories(storeCategories.categories);
      }, error => console.log(error))
    // }
  }

  storeCategories.setCurrentCategory = (id) => {
    angular.copy(storage.getCategory(id), storeCategories.currentCategory)


    //no need

    // return $http.get('/categories/' + id)
    //   .then(success => angular.copy(success.data, storeCategories.currentCategory),
    //     error => {
    //       if (!error.data) {
    //         let category = storage.getCategory(id);
    //         if (category) {
    //           angular.copy(category, storeCategories.currentCategory)
    //         }
    //       }
    //       $location.path('/home')
    //     })
  }

  //no need
  // storeCategories.get = (id) => {
  //   // angular.copy(storage.getCategory(id), storeCategories.currentCategory)
  //   return $http.get('/categories/' + id)
  //     .then(success => angular.copy(success.data, storeCategories.currentCategory))
  // }

  storeCategories.create = (category) => {
    category.id = storeCategories.generateId();

    storage.saveCategory(category);
    storeCategories.categories.push(category)

    $http.post('users/' + user.info._id + '/categories', category)
      .then(success => {
        storeCategories.categories.push(success.data)
      }, error => console.log(error))
  }

  storeCategories.delete = id => {
    storage.deleteCategory(storeCategories.currentCategory.id);
    storeCategories.deleteElement(storeCategories.categories, id);
    // $location.path('/home');
    $http.delete('/categories/' + id)
      .then(success => {
        storeCategories.deleteElement(storeCategories.categories, id);

        // storeCategories.setDefaultCurrentCategory();
        $location.path('/home');
      })
  }
  //
  // storeCategories.setDefaultCurrentCategory = () => {
  //   if (storeCategories.categories.length) {
  //     storeCategories.setCurrentCategory(storeCategories.categories[0].id)
  //   } else {
  //     angular.copy({}, storeCategories.currentCategory);
  //     $location.path('/home');
  //   }
  // }


  storeCategories.generateId = () => {
    var currentDate = (new Date()).valueOf().toString();
    var random = Math.random().toString().slice(2);
    return currentDate + random;
  }


  storeCategories.updateCategory = (id) => {
    storage.saveCategory(storeCategories.currentCategory);

    $http.put('/categories/' + id, storeCategories.currentCategory)
      .then(success => {
        storage.deleteCategory(storeCategories.currentCategory.id)
      }, error => console.log(error))
  }

  storeCategories.addTodo = (id, todo) => {
    storeCategories.currentCategory.todos.push(todo)
    return storeCategories.updateCategory(storeCategories.currentCategory.id)
  }

  storeCategories.deleteTodo = (category, todo) => {
    storeCategories.deleteElement(category.todos, todo.id)
    return storeCategories.updateCategory(category.id)


    /// no need

    // return $http.delete('/categories/' + category.id + '/todos/' + todo.id)
    //   .then(success => {
    //     console.log('success', success)
    //   }, error => console.log('error', error))
  }

  storeCategories.deleteElement = (list, id) => {
    let deleteId;
    list.forEach((el, index) => {
      if (el.id === id) {
        deleteId = index;
      }
    })
    list.splice(deleteId, 1);
  }

  return storeCategories;
}
