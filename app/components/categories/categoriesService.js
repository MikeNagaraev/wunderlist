categoriesService.$inject = ['$http', 'userService', '$location'];

export default function categoriesService($http, user, $location) {
  const store = {
    categories: [],
    currentCategory: {}
  }

  store.getAll = () => {
    return $http.get('users/' + user.info._id)
      .then(function(success) {
          angular.copy(success.data.categories, store.categories)
        },
        error => console.log(error))
  }

  store.get = (id) => {
    return $http.get('/categories/' + id)
      .then(success => angular.copy(success.data, store.currentCategory))
  }

  store.create = (category) => {
    return $http.post('users/' + user.info._id + '/categories', category)
      .then(function(success) {
          store.categories.push(success.data)
        },
        error => console.log(error))
  }

  store.delete = id => {
    return $http.delete('/categories/' + id)
      .then(success => {
        let deleteId;
        store.categories.forEach((el, index) => {
          if (el._id === id) {
            deleteId = index;
          }
        })
        store.categories.splice(deleteId, 1);
        store.setDefaultCurrentCategory();
      })
  }

  store.setDefaultCurrentCategory = () => {
    if (store.categories.length) {
      store.get(store.categories[0]._id)
    } else {
      angular.copy({}, store.currentCategory);
      $location.path('/home');
    }
  }

  store.updateCategory = (id) => {
    return $http.put('/categories/' + id, store.currentCategory)
      .then(success => {}, error => console.log(error))
  }

  store.addTodo = (id, todo) => {
    store.currentCategory.todos.push(todo)
    return store.updateCategory(store.currentCategory._id)
  }

  store.deleteTodo = (category, todo) => {
    let deleteId;
    category.todos.forEach((el, index) => {
      if (el._id === todo._id) {
        deleteId = index;
      }
    })
    category.todos.splice(deleteId, 1)
    return store.updateCategory(category._id)
    //
    // return $http.delete('/categories/' + category._id + '/todos/' + todo._id)
    //   .then(success => {
    //     console.log('success', success)
    //   }, error => console.log('error', error))
  }
  return store;
}
