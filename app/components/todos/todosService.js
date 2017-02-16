export default function($http) {
  const store = {
    todos: []
  }
  store.getAll = () => {
    return $http.get('/todos')
      .then(function(success) {
          angular.copy(success.data, store.todos)
        },
        error => console.log(error))
  }

  store.create = (todo) => {
    return $http.post('/todos', todo)
      .then(function(success) {
          store.todos.push(success.data)
        },
        error => console.log(error))
  }

  store.remove = todo => {
    return $http.delete('/todos/' + todo._id)
      .then(success => {
          store.deleteById(success.data.id);
        },
        error => console.log(error))
  }

  store.deleteById = id => {
    let deletId;
    store.todos.forEach((el, index) => {
      if (el._id === id) {
        deletId = index;
      }
    })
    store.todos.splice(deletId, 1);
  }
  return store;
}
