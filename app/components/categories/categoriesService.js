CategoriesService.$inject = ['$http'];

export default function CategoriesService($http) {
  const store = {
    categories: [],
    currentCategory: {}
  }
  store.getAll = () => {
    return $http.get('/categories')
      .then(function(success) {
          angular.copy(success.data, store.categories)
        },
        error => console.log(error))
  }

  store.get = (id) => {
    return $http.get('/categories/' + id)
  }

  store.create = (category) => {
    return $http.post('categories', category)
      .then(function(success) {
          store.categories.push(success.data)
        },
        error => console.log(error))
  }



  store.addTodo = (id, todo) => {
    return $http.post('categories/' + id + '/todos', todo)
  }

  store.deleteTodo = (category, todo) => {
    return $http.delete('/categories/' + category._id + '/todos/' + todo._id)
      .then(success => {
        let deleteId;
        category.todos.forEach((el, index) => {
          if (el._id === todo._id) {
            deleteId = index;
          }
        })
        category.todos.splice(deleteId, 1)
      })
  }
  //
  // store.remove = category => {
  //   return $http.delete('/categories/' + category._id)
  //     .then(success => {
  //         store.deleteById(success.data.id);
  //       },
  //       error => console.log(error))
  // }
  //
  // store.deleteById = id => {
  //   let deletId;
  //   store.categories.forEach((el, index) => {
  //     if (el._id === id) {
  //       deletId = index;
  //     }
  //   })
  //   store.categories.splice(deletId, 1);
  // }
  return store;
}
