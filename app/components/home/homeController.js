HomeController.$inject = ['$scope', 'userService', 'categoriesService'];

export default function HomeController($scope,user, categories) {
  console.log('home')
  categories.getAll();
}
