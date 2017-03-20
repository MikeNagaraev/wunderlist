categoriesService.$inject = ['$http', 'userService', '$location'];

export default function categoriesService($http, user, $location) {
  const serviceCategories = {
    categories: [],
    currentCategory: {}
  }

  serviceCategories.setAll = () => {
    $http.get('users/' + user.info._id)
      .then(success => {
        angular.copy(success.data.categories, serviceCategories.categories);
      })
  }

  serviceCategories.setCurrentCategory = (id) => {
    $http.get('/users/' + user.info._id + '/categories/' + id)
      .then(
        success => angular.copy(success.data, serviceCategories.currentCategory),
        error => $location.path('/home'))
  }

  serviceCategories.create = (category) => {
    category.id = serviceCategories.generateId();
    serviceCategories.categories.push(category);
    serviceCategories.createInBD(category);
  }

  serviceCategories.createInBD = (category) => {
    $http.post('/users/' + user.info._id + '/categories', category)
      .then(success => {}, error => {})
  }

  serviceCategories.update = (id) => {
    serviceCategories.categories[serviceCategories.getPosCategory(id)].title = serviceCategories.currentCategory.title;
    $http.put('/users/' + user.info._id + '/categories/' + id, serviceCategories.currentCategory)
      .then(success => {}, error => {})
  }

  serviceCategories.delete = id => {
    serviceCategories.deleteElement(serviceCategories.categories, id)
    serviceCategories.deleteDB(id);
  }

  serviceCategories.deleteDB = id => {
    $http.delete('/users/' + user.info._id + '/categories/' + id)
      .then(success => {
        $location.path('/home');
      }, error => {})
  }

  serviceCategories.generateId = () => {
    var currentDate = (new Date()).valueOf().toString();
    var random = Math.random().toString().slice(2);
    return currentDate + random;
  }

  serviceCategories.addTodo = (id, todo) => {
    serviceCategories.currentCategory.todos.push(todo)
    serviceCategories.update(serviceCategories.currentCategory.id)
  }

  serviceCategories.deleteTodo = (category, todo) => {
    serviceCategories.deleteElement(category.todos, todo.id)
    serviceCategories.update(category.id)
  }

  serviceCategories.getCategory = (id) => {
    for (let i = 0; i < serviceCategories.categories.length; i++) {
      if (serviceCategories.categories[i].id === id) {
        return serviceCategories.categories[i];
      }
    }
    return -1;
  }

  serviceCategories.getPosCategory = id => {
    for (let i = 0; i < serviceCategories.categories.length; i++) {
      if (serviceCategories.categories[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  serviceCategories.deleteElement = (list, id) => {
    let deleteId;
    list.forEach((el, index) => {
      if (el.id === id) {
        deleteId = index;
      }
    })
    list.splice(deleteId, 1);
  }

  return serviceCategories;
}
