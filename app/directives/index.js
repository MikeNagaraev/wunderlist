export function sortableList($scope, $elemet) {
  return {
    controller: ($scope, $element) => {
      $element.sortable()
      $element.disableSelection();
    }
  }
}

export function selectableDirective($scope, $element) {
  return {
    controller: ($scope, $element) => {
      $scope.selectCategory = () => {
        $scope.resetSelectedCategories();
        if ($element.hasClass('category-item')) {
          if ($element.hasClass('selected')) {
            return;
          } else {
            $element.addClass('selected');
          }
        }
      }
      $scope.resetSelectedCategories = () => {
        $('.category-item').removeClass('selected');
      }

      $element.click($scope.selectCategory);
    }
  }
}

export function categoryOptions($scope, $element) {
  return {
    controller: ($scope, $element) => {
      $scope.toggleOptions = () => {
        if ($element.next('.category-options-container').css('display') === 'block') {
          hideOptions();
        } else {
          showOptions();
        }
      }

      const hideOptions = () => {
        let toggledOption = $element.next('.category-options-container');
        $(toggledOption).toggle('slideDown');
      }

      const showOptions = () => {
        let toggledOption = $element.next('.category-options-container');
        $('.category-options-container').hide();
        $(toggledOption).toggle('slideDown');
      }

      $element.click($scope.toggleOptions);
    }
  }
}

export function categoryToggle($scope, $element) {
  return {
    controller: ($scope, $element) => {
      $scope.toggleCategoryList = () => {
        $('.categories-list').toggle();
        $element.find('.glyphicon').toggleClass('glyphicon-chevron-up')
        $element.find('.glyphicon').toggleClass('glyphicon-chevron-down')
      }

      $element.click($scope.toggleCategoryList)
    }
  }
}

export function modalShow($scope, $element) {
  return {
    controller: ($scope, $element) => {
      $scope.showCategoryWindow = () => {
        if (!$('#modal-category').hasClass('opened')) {
          $('#modal-category').addClass('opened').show();
        }
      }
      $element.click($scope.showCategoryWindow)
    }
  }
}

export function modalHide($scope, $element) {
  return {
    controller: ($scope, $element) => {
      $scope.hideCategoryWindow = () => {
        if ($('#modal-category').hasClass('opened')) {
          $('#modal-category').removeClass('opened').hide();
        }
      }
      $element.click($scope.hideCategoryWindow);
    }
  }
}

export function toggleDirective($scope, $element) {
  return {
    controller: ($scope, $element) => {
      $scope.toggleAside = () => {
        $('.category-block-title').toggle();
        if ($element.hasClass('opened')) {
          $('.categories-list a').css('top', '50px');
          $('.home-aside').css('width', '50px');
          $element.removeClass('opened');
          $scope.toggleHomeContainer(false);
        } else {
          $('.categories-list a').css('top', '0px');
          $element.addClass('opened');
          $('.home-aside').css('width', '15%');
          $scope.toggleHomeContainer(true);
        }
      }

      $element.click($scope.toggleAside);

      $scope.toggleHomeContainer = flag => {
        if (flag) {
          $('.home-container').css('width', '85%');
        } else {
          $('.home-container').css('width', 'calc(100% - 50px)');
        }
      }
    }
  }
}
