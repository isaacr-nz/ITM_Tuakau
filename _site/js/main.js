$(document).ready( function() {
    var classNames = ["one", "other", "one", "other"],
    classNames_nav = ["zero", "one", "two", "three", "four"];
    $(".nav-link, .page_nav_sect, .btn").click(function(){
        var href = $(this).attr('href').slice(-1);
        $(".main").moveTo(href);
        $(".navbar").removeClass('one other').addClass(classNames[href-1]);
        $(".nav-item").removeClass('active');
        $(".page_nav_cont").removeClass("one two three four").addClass(classNames_nav[href])
        $(".nav-item:nth-child(" + href + ")").addClass('active');
    });
    $(".navbar-toggler").click(function(){
        $(this).toggleClass("pressed");
    });
    $(".main").onepage_scroll({
        sectionContainer: "section",    // sectionContainer accepts any kind of selector in case you don't want to use section
        easing: "ease",                 // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                        // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
        animationTime: 800,             // AnimationTime let you define how long each section takes to animate
        pagination: false,              // You can either show or hide the pagination. Toggle true for show, false for hide.
        updateURL: true,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
        beforeMove: function(index) {
            var url = window.location.href.slice(-1),
                margin_page = 125 - (url * 125);
            $(".page_nav_cont").removeClass("one two three four").addClass(classNames_nav[url]);
            if (url == 1 || url == 2 || url == 3 || url == 4) {
                $(".navbar").removeClass('one other').addClass(classNames[url-1]);
                $(".nav-item").removeClass('active');
                $(".nav-item:nth-child(" + url + ")").addClass('active');
            };
        },  // This option accepts a callback function. The function will be called before the page moves.
        afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
        loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
        keyboard: true,                  // You can activate the keyboard controls
        responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                         // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                         // the browser's width is less than 600, the fallback will kick in.
        direction: "horizontal"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
     });
    
});
/*
function toggle_menu(x) {
    x.classList.toggle("change");
    if ($(x).hasClass("change")) {
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

}*/