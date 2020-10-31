gsap.registerPlugin(ScrollTrigger);
(function() {
	"use strict";
	/*[pan and well CSS scrolls]*/
	var pnls = document.querySelectorAll('.panel').length,
		scdir, hold = false;

	function _scrollY(obj) {
		var slength, plength, pan, step = 100,
			vh = window.innerHeight / 100,
			vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
		if ((this !== undefined && this.id === 'well') || (obj !== undefined && obj.id === 'well')) {
			pan = this || obj;
			plength = parseInt(pan.offsetHeight / vh);
		}
		if (pan === undefined) {
			return;
		}
		plength = plength || parseInt(pan.offsetHeight / vmin);
		slength = parseInt(pan.style.transform.replace('translateY(', ''));
		if (scdir === 'up' && Math.abs(slength) < (plength - plength / pnls)) {
			slength = slength - step;
		} else if (scdir === 'down' && slength < 0) {
			slength = slength + step;
		} else if (scdir === 'top') {
			slength = 0;
		}
		if (hold === false) {
			hold = true;
			pan.style.transform = 'translateY(' + slength + 'vh)';
			setTimeout(function() {
				hold = false;
			}, 1000);
		}
		console.log(scdir + ':' + slength + ':' + plength + ':' + (plength - plength / pnls));
	}
	/*[swipe detection on touchscreen devices]*/
	function _swipe(obj) {
		var swdir,
			sX,
			sY,
			dX,
			dY,
			threshold = 100,
			/*[min distance traveled to be considered swipe]*/
			slack = 50,
			/*[max distance allowed at the same time in perpendicular direction]*/
			alT = 500,
			/*[max time allowed to travel that distance]*/
			elT, /*[elapsed time]*/
			stT; /*[start time]*/
		obj.addEventListener('touchstart', function(e) {
			var tchs = e.changedTouches[0];
			swdir = 'none';
			sX = tchs.pageX;
			sY = tchs.pageY;
			stT = new Date().getTime();
			//e.preventDefault();
		}, false);

		obj.addEventListener('touchmove', function(e) {
			e.preventDefault(); /*[prevent scrolling when inside DIV]*/
		}, false);

		obj.addEventListener('touchend', function(e) {
			var tchs = e.changedTouches[0];
			dX = tchs.pageX - sX;
			dY = tchs.pageY - sY;
			elT = new Date().getTime() - stT;
			if (elT <= alT) {
				if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
					swdir = (dX < 0) ? 'left' : 'right';
				} else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
					swdir = (dY < 0) ? 'up' : 'down';
				}
				if (obj.id === 'well') {
					if (swdir === 'up') {
						scdir = swdir;
						_scrollY(obj);
					} else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
						scdir = swdir;
						_scrollY(obj);

					}
					e.stopPropagation();
				}
			}
		}, false);
	}
	/*[assignments]*/
	var well = document.getElementById('well');
	well.style.transform = 'translateY(0)';
	well.addEventListener('wheel', function(e) {
		if (e.deltaY < 0) {
			scdir = 'down';
		}
		if (e.deltaY > 0) {
			scdir = 'up';
		}
		e.stopPropagation();
	});
	well.addEventListener('wheel', _scrollY);
	_swipe(well);
	var tops = document.querySelectorAll('.nav-item');
	for (var i = 0; i < tops.length; i++) {
		tops[i].addEventListener('click', function() {
			scdir = 'top';
			_scrollY(well);
		});
	}
})();
const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#section2",
      start: "top top",
      end: "center center",
      scrub: 1,
      markers: true
    }
  });
  
$(document).ready( function() {
    
    var url = $(location).attr("href").slice(-1);
    gsap.from(".navbar", {duration: .5, marginTop: "-96px"});
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