userService.$inject = ['$http', 'auth']

export default function userService($http, auth) {
  const user = {
    info: auth.getUser(),
    categories: {}
  };
  return user;
}
