categoriesService.$inject = ['$http', 'userService', '$location', 'storageService'];

export default function categoriesService($http, user, $location, storage) {
  const serviceCategories = {
    categories: [],
    currentCategory: {}
  }

  serviceCategories.setAll = () => {
    $http.get('users/' + user.info._id)
      .then(success => {
        angular.copy(success.data.categories, serviceCategories.categories);
        storage.init();
      })
  }

  serviceCategories.setCurrentCategory = (id) => {
    // let currentCategory = serviceCategories.getCategory(id);
    // if (currentCategory != -1) {
    $http.get('/users/' + user.info._id + '/categories/' + id)
      .then(success =>
        angular.copy(success.data, serviceCategories.currentCategory))
    // angular.copy(currentCategory, serviceCategories.currentCategory)
    // } else {
    //   $location.path('/home')
    // }
  }

  serviceCategories.create = (category) => {
    category.id = serviceCategories.generateId();
    serviceCategories.categories.push(category);
    serviceCategories.createInBD(category);
  }

  serviceCategories.createInBD = (category) => {
    $http.post('/users/' + user.info._id + '/categories', category)
      .then(success => {
        // serviceCategories.updateAll();
      }, error => {
        storage.categories.create.push(category);
        storage.update()
      })
  }

  serviceCategories.update = (id) => {
    $http.put('/users/' + user.info._id + '/categories/' + id, serviceCategories.currentCategory)
      .then(success => {
        console.log('update')
        // serviceCategories.updateAll();
      }, error => {
        storage.categories.update.push(id);
        storage.update()
      })
  }

  serviceCategories.delete = id => {
    serviceCategories.deleteElement(serviceCategories.categories, id)

    serviceCategories.deleteDB(id);

  }

  serviceCategories.deleteDB = id => {
    $http.delete('/users/' + user.info._id + '/categories/' + id)
      .then(success => {
        $location.path('/home');
        // serviceCategories.updateAll();
      }, error => {
        storage.categories.delete.push(id);
        // storage.update()
      })
  }

  serviceCategories.generateId = () => {
    var currentDate = (new Date()).valueOf().toString();
    var random = Math.random().toString().slice(2);
    return currentDate + random;
  }

  serviceCategories.updateAll = () => {
    serviceCategories.checkCreate(storage.categories.create)
    serviceCategories.checkUpdate(storage.categories.update)
    serviceCategories.checkDelete(storage.categories.delete)
  }

  serviceCategories.checkCreate = (list) => {
    if (list.length) {
      list.forEach(el => {
        storage.remove(storage.categories.create, el.id);
        serviceCategories.createInBD(el);
      })
    }
    storage.update()
  }

  serviceCategories.checkUpdate = (ids) => {
    if (ids.length) {
      ids.forEach(id => {
        storage.remove(storage.categories.update, id);

        serviceCategories.update(id);
      })
    }
    storage.update()
  }

  serviceCategories.checkDelete = (ids) => {
    if (ids.length) {
      ids.forEach(id => {
        storage.remove(storage.categories.delete, id);

        serviceCategories.deleteDB(id);
      })
    }
    storage.update()
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
