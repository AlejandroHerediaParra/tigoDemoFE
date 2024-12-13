const endPointUrl = 'http://localhost:8080/';

const endPointPaths = {
  signUpUrl: endPointUrl + 'register',
  signInUrl: endPointUrl + 'authentication',
  updateUserUrl: endPointUrl + 'users/',
  getProductsUrl: endPointUrl + 'products',
  searchProductsUrl: endPointUrl + 'products/search?title='
}

export default endPointPaths;