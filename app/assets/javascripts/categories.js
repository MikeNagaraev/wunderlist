function showCategoryWindow() {
  if (!$('#modal-category').hasClass('opened')) {
    $('#modal-category').addClass('opened').show();
  }
}

function hideCategoryWindow() {
  if ($('#modal-category').hasClass('opened')) {
    $('#modal-category').removeClass('opened').hide();
  }
}

function selectCategory(event) {
  resetSelectedCategories();
  if ($(event.target).hasClass('category-item')) {
    if ($(event.target).hasClass('selected')) {
      return;
    } else {
      $(event.target).addClass('selected');
    }
  }
}

function resetSelectedCategories() {
  $('.category-item').removeClass('selected');
}
