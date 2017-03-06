HomeController.$inject = ['$scope', 'userService', 'categoriesService'];

export default function HomeController($scope,user, categories) {
  user.set();
  categories.getAll();
}
