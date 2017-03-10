UserController.$inject = ['$scope', 'auth', 'userService']

export default function UserController($scope, auth, user) {
  this.user = user.info;

  this.logOut = () => {
    auth.logOut();
  }

  this.update = () => {
    user.updateUser();
  }
}
