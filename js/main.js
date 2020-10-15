
function toggle_menu(x) {
    x.classList.toggle("change");
    if ($(x).hasClass("change")) {
        $('body').css('overflow', 'hidden');
        $(".menu_container").toggleClass("menu_container_open");
        $(".masthead, .content").toggleClass('blur');
        if ($('.fixed-top.text-center h2').hasClass('op0')) {
            $('.fixed-top.text-center h2').removeClass('op0');
        };
        setTimeout(
            function () {
                $(".menu_container").toggle();
                $(".sidebar").toggleClass("menu_open");
                
                setTimeout(
                    function () {

                        $(".sidebar_list").toggleClass("op1");

                    }, 300);
            }, 300);
    } else {
        $('body').css('overflow', 'visible');
        $(".sidebar_list").toggleClass("op1");
        $(".masthead, .content").toggleClass('blur');
        if ($(document).scrollTop() > 300) {
            $('.fixed-top.text-center h2').addClass('op0');
        };
        setTimeout(
            function () {
                $(".sidebar").toggleClass("menu_open");
            }, 300);
        setTimeout(
            function () {
                $(".menu_container").toggle();
                $(".menu_container").toggleClass("menu_container_open");
            }, 600);

    }

}