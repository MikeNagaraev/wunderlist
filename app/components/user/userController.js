UserController.$inject = ['$scope', 'auth', 'userService']

export default function UserController($scope, auth, user) {
  this.user = user;


  this.logOut = () => {
    auth.logOut();
  }
}
