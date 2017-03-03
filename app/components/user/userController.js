UserController.$inject = ['$scope', 'auth']

export default function UserController($scope, auth) {
  this.user = auth.getUser();

  this.logOut = () => {
    auth.logOut();
  }
}
