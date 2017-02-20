CategoriesController.$inject = ['$scope', 'categoriesService']

export default function CategoriesController($scope, categoriesService) {
  this.scope = $scope;
  this.categories = categoriesService.categories;
  this.currentCategory = categoriesService.currentCategory;

  if (!this.currentCategory && this.categories) {
    this.currentCategory = this.categories[0]
  }

  this.addCategory = () => {
    if (this.title != "" || this.title) {
      categoriesService.create({
        title: this.title
      })
      this.title = '';
      this.priority = '';
    } else {
      return;
    }
  };

  this.deleteCategory = (category) => {

  }

  this.editCategory = (category) => {

  }

  // this.setCurrentCategory = (category) => {
  //   if (category) {
  //     if (category._id === this.currentCategory._id) {
  //       return
  //     }
  //     this.currentCategory = category;
  //   } else {
  //     if (this.categories.length) {
  //       this.currentCategory = this.categories[0];
  //     }
  //   }
  //   categoriesService.get(this.currentCategory._id)
  //     .then(success => {
  //       angular.copy(success.data, this.currentCategory)
  //     })
  // }

  this.addTodo = () => {
    categoriesService.addTodo(this.currentCategory._id, {
      title: this.todoTitle,
      priority: this.priority
    }).then(success => {
      this.currentCategory.todos.push(success.data)
    }, error => console.log(error))
    this.todoTitle = '';
    this.priority = '';
  }

  this.deleteTodo = (todo) => {
    categoriesService.deleteTodo(this.currentCategory, todo);
  }



  //
  // this.removeCategory = function(category) {
  //   categoriesService.remove(category);
  // }.bind(this)
}
