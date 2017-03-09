categoriesService.$inject = ['$http', 'userService', '$location', 'storageService'];

export default function categoriesService($http, user, $location, storage) {
  const storeCategories = {
    categories: [],
    currentCategory: {}
  }

  storeCategories.getAll = () => {
    return $http.get('users/' + user.info._id)
      .then(function(success) {
          angular.copy(success.data.categories, storeCategories.categories)
        },
        error => console.log(error))
  }

  storeCategories.setCurrentCategory = (id) => {
    ////storage////

    ////db////
    return $http.get('/categories/' + id)
      .then(success => angular.copy(success.data, storeCategories.currentCategory),
        error => $location.path('/home'))
  }

  storeCategories.get = (id) => {
    return $http.get('/categories/' + id)
      .then(success => angular.copy(success.data, storeCategories.currentCategory))
  }

  storeCategories.create = (category) => {
    return $http.post('users/' + user.info._id + '/categories', category)
      .then(function(success) {
          storeCategories.categories.push(success.data)
        },
        error => console.log(error))
  }

  storeCategories.delete = id => {
    return $http.delete('/categories/' + id)
      .then(success => {
        storeCategories.deleteElement(storeCategories.categories, id);
        // storeCategories.setDefaultCurrentCategory();
        $location.path('/home');
      })
  }
  //
  // storeCategories.setDefaultCurrentCategory = () => {
  //   if (storeCategories.categories.length) {
  //     storeCategories.setCurrentCategory(storeCategories.categories[0]._id)
  //   } else {
  //     angular.copy({}, storeCategories.currentCategory);
  //     $location.path('/home');
  //   }
  // }

  storeCategories.updateCategory = (id) => {
    return $http.put('/categories/' + id, storeCategories.currentCategory)
      .then(success => {}, error => console.log(error))
  }

  storeCategories.addTodo = (id, todo) => {
    storeCategories.currentCategory.todos.push(todo)
    return storeCategories.updateCategory(storeCategories.currentCategory._id)
  }

  storeCategories.deleteTodo = (category, todo) => {
    storeCategories.deleteElement(category.todos, todo._id)
    return storeCategories.updateCategory(category._id)
    //
    // return $http.delete('/categories/' + category._id + '/todos/' + todo._id)
    //   .then(success => {
    //     console.log('success', success)
    //   }, error => console.log('error', error))
  }

  storeCategories.deleteElement = (list, id) => {
    let deleteId;
    list.forEach((el, index) => {
      if (el._id === id) {
        deleteId = index;
      }
    })
    list.splice(deleteId, 1);
  }

  return storeCategories;
}
