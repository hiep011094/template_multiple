(function () { 

  $('.c_mv01__img').slick({
    arrows: false,
		fade: true,
		autoplaySpeed: 5000,
		speed: 1,
  });


  $('.c_slider01').slick({
    arrows: false,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1, 
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [      
      {
        breakpoint: 1023,
        settings: {          
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });


  $(window).on("load", function () {
    $('.c_loading').delay(500).fadeOut('fast')

    setTimeout(() => {
      $('.c_animation').delay(500).fadeOut('fast')    
    }, 4000);

    setTimeout(function(){        
      $('.c_mv01__img').slick('slickPlay');
    },2500); 
    
    $('.js_click').on("click",function(){
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(".c_banner").css('transform','translateX(calc(100%))');
      } else {
          $(this).toggleClass("active");
          $(".c_banner").css('transform','translateX(0)');
      }
    })
  });
})();

class slider {
  constructor(classSlider, option) {
      this.optionSlick = option;
      this.class = $(classSlider);
  }
  animate(ele, classActive = ".active") {
      let scaleRatio = 230 / 540;
      let gap = 4.5;
      const transx1 = function () {
          return scaleRatio * 100 / 1.03 - gap;
      }
      const transx2 = function (index) {
          return 115 * index + transx1();
      }
      ele.find(classActive).css("transform", "scale(1)")
      ele.find(classActive).prevAll().each(function (index, _) {
          $(this).css('transform', "scale(" + scaleRatio + ") translateX(" + (index === 0 ? transx1() : transx2(index)) + "%)");
      })
      ele.find(classActive).nextAll().each(function (index, _) {
          $(this).css('transform', "scale(" + scaleRatio + ") translateX(-" + (index === 0 ? transx1() : transx2(index)) + "%)");
      })
  }
  initSlider() {
      let animate = this.animate;

      this.class.on('init', function (_, slick) {
          $(this).find(".slick-slide").css("transition", "none");
          $(this).find('.slick-current').addClass('active');
          $(".people_index_current").html(slick.currentSlide + 1);
          $(".people_index_total").html(slick.$slides.length);
          animate.call(slider, $(this));
      });
  }
  // On before slide change
  before() {
      let animate = this.animate;
      this.class.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          $(this).find(".slick-slide").css("transition", "0.5s");
          slick.$slides[currentSlide].classList.remove("active")
          slick.$slides[nextSlide].classList.add("active")
          $(".people_index_current").html(nextSlide + 1);
          animate.call(slider, $(this));

          if (nextSlide === 0 && currentSlide === slick.$slides.length - 1) {
              slick.$slides[currentSlide].nextSibling.classList.add("active");
              animate.call(slider, $(this), '.slick-cloned.active');
          }
          if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
              slick.$slides[currentSlide].previousSibling.classList.add("active");
              animate.call(slider, $(this), '.slick-cloned.active');
          }

      });
  }
  // On after slide change
  after() {
      let animate = this.animate;
      this.class.on('afterChange', function (event, slick, currentSlide, nextSlide) {
          $(this).find(".slick-slide").css("transition", "none");
          $(this).find('.slick-cloned').removeClass("active");
          animate.call(slider, $(this));
      });
  }
  play() {
      this.initSlider();
      this.class.slick(this.optionSlick);
      this.before();
      this.after();
  }
}

const peopleList = new slider(".c_slider02", {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1, 
  responsive: [      
    {
      breakpoint: 769,
      settings: {
        
        slidesToShow: 1
      }
    }
  ]
})

peopleList.play();

