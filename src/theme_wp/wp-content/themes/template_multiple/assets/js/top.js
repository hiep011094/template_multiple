(function () { 
  $('.c_slider').on('init', function(event, slick){
    $('.c_slider__navi__count').text(slick.slideCount);
    $('.c_slider__navi__run').text(1);
  });

  $('.c_slider').slick({
    arrows: true,
    prevArrow: $('.c_slider__arrows__prev'),
    nextArrow: $('.c_slider__arrows__next'),
    appendArrows: $('.c_slider__arrows'),
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  $('.c_slider').on('afterChange', function(event, slick, currentSlide){
    let i = currentSlide + 1;
    $('.c_slider__navi__run').text(i);
  });


  $(window).on("load", function () {
    $('.c_loading').delay(500).fadeOut('fast')
  });
})();



