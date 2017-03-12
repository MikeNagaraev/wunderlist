CategoriesController.$inject = ['$scope', 'categoriesService']

export default function CategoriesController($scope, categoriesService) {
  this.categories = categoriesService.categories;
  this.currentCategory = categoriesService.currentCategory;

  $scope.selected = '-priority';
  this.addCategory = () => {
    if (this.title != "" || this.title) {
      categoriesService.create({
        title: this.title
      })
      this.title = '';
    } else {
      return;
    }
  };


  this.setCurrentCategory = (category) => {
    categoriesService.setCurrentCategory(category.id)
  }

  this.deleteCategory = (category) => {
    categoriesService.delete(category.id);
  }

  this.update = (id) => {
    categoriesService.update(id);
  }

  this.addTodo = () => {
    if (!this.todoTitle || this.todoTitle == '') {
      return;
    }
    categoriesService.addTodo(this.currentCategory.id, {
      title: this.todoTitle,
      priority: this.todoPriority || 1,
      createdAt: this.todoCreatedAt,
      expiredAt: this.todoExpiredAt
    })
    this.todoTitle = '';
  }

  this.deleteTodo = (todo) => {
    categoriesService.deleteTodo(this.currentCategory, todo);
  }
}
