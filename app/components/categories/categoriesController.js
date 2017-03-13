CategoriesController.$inject = ['$scope', 'categoriesService']

export default function CategoriesController($scope, categoriesService) {
  this.categories = categoriesService.categories;
  this.currentCategory = categoriesService.currentCategory;

  $scope.userPriority = '';
  $scope.userExpiredDate = '';
  $scope.userCreatedDate = '';
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

  this.getNumberOfDays = time => {
    let timeNow = new Date().getTime();
    let millisInDay = 1000 * 60 * 60 * 24;
    return Math.floor(Math.abs((timeNow - time) / (millisInDay))) - 30
  }

  this.getDay = time => {
    let date = new Date(Number(time))
    let month = date.getUTCMonth() + 1
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();
    let newdate = day + "-" + month + "-" + year;
    return newdate;
  }

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
    if (!this.todoTitle || this.todoTitle == '' || !this.todoExpiredAt) {
      return;
    }
    let year = Number(this.todoExpiredAt.slice(6, 10));
    let month = Number(this.todoExpiredAt.slice(3, 5));
    let day = Number(this.todoExpiredAt.slice(0, 2))
    let timeExpire = new Date(year, month, day)
    let timeNow = new Date();
    console.log(timeNow)
    console.log(timeNow.getTime())
    console.log(timeExpire.getTime())
    categoriesService.addTodo(this.currentCategory.id, {
      title: this.todoTitle,
      priority: this.todoPriority || 1,
      createdAt: timeNow.getTime(),
      expiredAt: timeExpire.getTime()
    })
    this.todoTitle = '';
    this.todoExpiredAt = '';
    this.todoPriority = '';
  }

  this.deleteTodo = (todo) => {
    categoriesService.deleteTodo(this.currentCategory, todo);
  }
}
