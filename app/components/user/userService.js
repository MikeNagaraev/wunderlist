userService.$inject = ['$http', 'auth']

export default function userService($http, auth) {
  const user = auth.getUser();
  console.log(user)

  return user;
}
