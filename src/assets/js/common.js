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
            removeFixedBodyModal();
            $(".c_toggle").removeClass("active");
            $(".c_gnavi").stop().slideToggle();
        } else {
            addFixedBodyModal()
            $(this).toggleClass("active");
            $(".c_gnavi").stop().slideToggle("fast");
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



