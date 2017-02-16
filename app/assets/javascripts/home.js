// import $ from 'jquery';
function toggleAside() {
  if ($('.burger-menu').hasClass('opened')) {
    $('.home-aside').css('width', '50px');
    $('.burger-menu').removeClass('opened');
    toggleHomeContainer(false);
  } else {
    $('.burger-menu').addClass('opened');
    $('.home-aside').css('width', '15%');
    toggleHomeContainer(true);
  }
}

function toggleHomeContainer(flag) {
  if (flag) {
    $('.home-container').css('width', '85%');
  } else {
    $('.home-container').css('width', 'calc(100% - 50px)');
  }
}
