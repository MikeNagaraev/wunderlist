const sortableList = ($scope, $elemet) => {
  return {
    link: ($scope, $element) => {
      $element.sortable()
      $element.disableSelection();
    }
  }
}

const selectableDirective = ($scope, $element) => {
  return {
    link: ($scope, $element) => {
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

      $('.category-options-container li').click(() => {
        $('.category-options-container').hide('slideDown')
      })

      $element.click($scope.selectCategory);
    }
  }
}

const categoryOptions = ($scope, $element) => {
  return {
    link: ($scope, $element) => {
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

const categoryToggle = ($scope, $element) => {
  return {
    link: ($scope, $element) => {
      $scope.toggleCategoryList = () => {
        $('.categories-list').toggle();
        $element.find('.glyphicon').toggleClass('glyphicon-chevron-up')
        $element.find('.glyphicon').toggleClass('glyphicon-chevron-down')
      }

      $element.click($scope.toggleCategoryList)
    }
  }
}

const modalShow = ($scope, $element) => {
  return {
    link: ($scope, $element) => {
      $scope.showCategoryWindow = () => {
        if (!$('#modal-category').hasClass('opened')) {
          $('#modal-category').addClass('opened').show();
        }
      }
      $element.click($scope.showCategoryWindow)
    }
  }
}

const modalEdit = ($scope, $element) => {
  return {
    link: ($scope, $element) => {
      $scope.showCategoryWindow = () => {
        if (!$('#modal-category-edit').hasClass('opened')) {
          $('#modal-category-edit').addClass('opened').show();
        }
      }
      $element.click($scope.showCategoryWindow)
    }
  }
}

const modalHide = ($scope, $element) => {
  return {
    link: ($scope, $element) => {
      $scope.hideCategoryWindow = () => {
        if ($element.closest($('.modal-category')).hasClass('opened')) {
          $element.closest($('.modal-category')).removeClass('opened').hide();
        }
      }
      $element.click($scope.hideCategoryWindow);
    }
  }
}

const toggleDirective = ($scope, $element) => {
  return {
    link: ($scope, $element) => {
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

const datePicker = ($scope, $element) => {
  return {
    link: ($scope, $element) => {
      let dateToday = new Date();
      $element.datepicker({
        dateFormat: 'dd-mm-yy',
        minDate: dateToday,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      });
    }
  }
}

export {
  sortableList,
  selectableDirective,
  categoryOptions,
  categoryToggle,
  modalShow,
  modalEdit,
  modalHide,
  toggleDirective,
  datePicker
}
