UserController.$inject = ['$scope', 'auth', 'userService']

export default function UserController($scope, auth, userService) {
  this.user = auth.getUser();

  this.logOut = () => {
    auth.logOut();
  }
}
