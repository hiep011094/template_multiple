let scroll_pos1 = 0;
function addFixedBodyModal() {
    scroll_pos1 = $(window).scrollTop();
    $('body')
        .addClass('overflow_modal')
        .css({ top: -scroll_pos1 + 'px' });
}
function removeFixedBodyModal() {
    $('body').removeClass('overflow_modal').css({ top: '' });
    $(window).scrollTop(scroll_pos1);
}
$(window).bind("load", function () {
    setTimeout(() => {
        $('html').removeClass('is_loadding')
    }, 2000);

    AOS.init({
        duration: 1000,
        once: true,
    });   
    new ScrollHint('.js_scrollable, .has-fixed-layout', {
        scrollHintIconAppendClass: 'scroll-hint-icon-white',
        applyToParents: true,
        i18n: {
            scrollable: 'スクロールできます',
        },
    });
});
$(document).ready(function () {

    $('a[href^="#"]').click(function () {
        const p = $($(this).attr("href")).offset();
        const h = $('.c_header').outerHeight() + 30 ;
        $("html,body").animate(
            {
                scrollTop: p.top - h,
            },
            600
        );
        return false;
    });

    //Anchor scroll
    const hash1 = location.hash;
    const $root = $("html, body");
    const _h = $('.c_header').outerHeight() + 30 ;
    if (hash1 !== "") {
        const top01 = $(hash1).offset().top;
        $root.animate({ scrollTop: top01 - _h }, 600);
    }

    //Anchor scroll
    $(".c_toggle").click(function () {
        if ($(this).hasClass("active")) {
            removeFixedBodyModal();
            $(".c_toggle").removeClass("active");
            $(".c_gnavi").stop().slideToggle();
            $(".c_header__btn").stop().fadeIn();
            $(this).find(".c_toggle__txt").text("MENU");
        } else {
            addFixedBodyModal();
            $(this).toggleClass("active");
            $(".c_gnavi").stop().slideToggle("fast");
            $(".c_header__btn").stop().fadeOut("fast");
            $(this).find(".c_toggle__txt").text("CLOSE");
        }
    });

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
        scroll_pos1 = $(window).scrollTop();
        if ($(window).width() > 767) {
            $(".c_gnavi").removeAttr("style");
            $(".c_toggle").removeClass("active");
            $('body').removeClass('overflow_modal').css({ top: '' });
            $(window).scrollTop(scroll_pos1);
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

$(function () {
    const sections = $('.js_section');
    const navLinks = $('.c_sticky__list__link');

    $(window).load(function () {
        let scrollPos = $(window).scrollTop();

        sections.each(function () {
            const sectionTop = $(this).offset().top - $(window).outerHeight();
            const sectionBottom = sectionTop + $(this).outerHeight();
            const id = $(this).attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.removeClass('active');
                $(`.c_sticky__list__link[href="#${id}"]`).addClass('active');
            }
        });
    });

    $(window).on('scroll', function () {
        let scrollPos = $(window).scrollTop();

        sections.each(function () {
            const sectionTop = $(this).offset().top - $(window).outerHeight();
            const sectionBottom = sectionTop + $(this).outerHeight();
            const id = $(this).attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.removeClass('active');
                $(`.c_sticky__list__link[href="#${id}"]`).addClass('active');
            }
        });
    });
});



