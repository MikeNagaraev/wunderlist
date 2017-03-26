const categoriesList = () => {
  return {
    restrict: 'A',
    controller: 'CategoriesController',
    templateUrl: './components/categories/categoriesList.html'
  }
}

const editCategoryPopUp = () => {
  return {
    restrict: 'A',
    templateUrl: './components/categories/editCategoryPopUp.html',
    controller: 'CategoriesController',
    controllerAs: 'category'
  }
}

const newCategoryPopUp = () => {
  return {
    restrict: 'A',
    templateUrl: './components/categories/newCategoryPopUp.html',
    controller: 'CategoriesController',
    controllerAs: 'category'
  }
}

export {
  categoriesList,
  editCategoryPopUp,
  newCategoryPopUp
}
