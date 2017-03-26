AuthController.$inject = ['$state', 'auth']

export default function AuthController($state, auth) {
  this.register = () => {
    auth.register(this.user)
  };

  this.logFacebook = () => {
    auth.logFacebook()
  }

  this.logIn = () => {
    auth.logIn(this.user)
  };
}
