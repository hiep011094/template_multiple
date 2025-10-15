(function () { 
  $('.c-slider').on('init', function(event, slick){
    $('.c-slider__navi__count').text(slick.slideCount);
    $('.c-slider__navi__run').text(1);
  });

  $('.c-slider').slick({
    arrows: true,
    prevArrow: $('.c-slider__arrows__prev'),
    nextArrow: $('.c-slider__arrows__next'),
    appendArrows: $('.c-slider__arrows'),
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  $('.c-slider').on('afterChange', function(event, slick, currentSlide){
    let i = currentSlide + 1;
    $('.c-slider__navi__run').text(i);
  });


  $(window).on("load", function () {
    $('.c-loading').delay(500).fadeOut('fast')
  });
})();



