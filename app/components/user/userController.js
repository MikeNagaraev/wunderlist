UserController.$inject = ['$scope', 'auth', 'userService']

export default function UserController($scope, auth, user) {
  user.set();
  this.user = user.info;

  this.logOut = () => {
    auth.logOut();
  }
}
