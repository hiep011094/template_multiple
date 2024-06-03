$(window).bind("load", function () {
    setTimeout(() => {
        $('html').removeClass('is_loadding')
    }, 2000);

    AOS.init({
        duration: 1000,
        once: true,
    });   


});
$(document).ready(function () {
    $('a[href^="#"]').click(function () {
        const p = $($(this).attr("href")).offset();
        if ($(window).width() > 767) {
            $("html,body").animate(
                {
                    scrollTop: p.top - 160,
                },
                600
            );
        } else {
            $("html,body").animate(
                {
                    scrollTop: p.top - 100,
                },
                600
            );
        }
        return false;
    });

    //Anchor scroll
    const hash1 = location.hash;
    const $root = $("html, body");
    if (hash1 !== "") {
        const top01 = $(hash1).offset().top;
        if ($(window).width() > 160) {
            $root.animate({ scrollTop: top01 - 160 }, 600);
        } else {
            $root.animate({ scrollTop: top01 - 100 }, 600);
        }
    }

    //Anchor scroll
    $(".c_toggle").click(function () {
        if ($(this).hasClass("active")) {
            $(".c_toggle").removeClass("active");
            $(".c_gnavi").stop().slideToggle();
        } else {
            $(this).toggleClass("active");
            $(".c_gnavi").stop().slideToggle("fast");
        }
    });

    // $(".c_gnavi__list__link").click(function () {
    //     $(".c_toggle").removeClass("active");
    //     $(".c_gnavi").stop().slideToggle();
    // });

    //Gnavi
    // if (!$('.over').hasClass("flag")) {
    //     $('.over').hover(function () {            
    //         $(this).find(".c_menu__sub").stop().slideDown();
    //     }, function () {
    //         $(this).find(".c_menu__sub").stop().slideUp();
    //     });
    // }
    // $(".over").click(function () {
    //     if ($(this).hasClass("flag")) {
    //         if ($(this).hasClass("active")) {
    //             $(this).find(".c_menu__sub").stop().slideUp();
    //             $(this).removeClass("active");
    //         } else {
    //             $(this).find(".c_menu__sub").stop().slideDown();
    //             $(this).addClass("active");
    //         }
    //     }
    // });

    // scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $(".c_totop").css("transform", "translateY(0)");
            $(".c_header").addClass("active");
        } else {
            $(".c_totop").removeAttr("style");
            $(".c_header").removeClass("active");
        }
    });

    $(window).bind("load resize", function () {
        if ($(window).width() > 767) {
            $(".c_gnavi").removeAttr("style");
            $(".c_toggle").removeClass("active");
            // $(".c_menu__sub").removeAttr("style");
            // $(".over").removeClass("flag");
        } else {
            $(".over").addClass("flag");
        }

        if ($(this).scrollTop() > 100) {
            $(".c_totop").css("transform", "translateY(0)");
            $(".c_header").addClass("active");
        } else {
            $(".c_totop").removeAttr("style");
            $(".c_header").removeClass("active");
        }
    });
});



