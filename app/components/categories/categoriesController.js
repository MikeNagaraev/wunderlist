CategoriesController.$inject = ['$scope', 'categoriesService']

export default function CategoriesController($scope, categoriesService) {
  this.categories = categoriesService.categories;
  this.currentCategory = categoriesService.currentCategory;

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

  this.deleteCategory = (category) => {
    categoriesService.delete(category._id);
  }

  this.editCategory = (category) => {

  }

  this.addTodo = () => {
    console.log(this.todoPriority)
    categoriesService.addTodo(this.currentCategory._id, {
      title: this.todoTitle,
      priority: this.todoPriority,
      createdAt: this.todoCreatedAt,
      expiredAt: this.todoExpiredAt
    }).then(success => {
      this.currentCategory.todos.push(success.data)
    }, error => console.log(error))
    this.todoTitle = '';
  }

  this.deleteTodo = (todo) => {
    categoriesService.deleteTodo(this.currentCategory, todo);
  }
}
