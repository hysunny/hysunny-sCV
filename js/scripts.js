
$(function() {
window.scrollTo(0,0);
	/* REQUIRES jRespond, Modernizr, FastClick and jPanelMenu */
		
	// Fastclick
    FastClick.attach(document.body);
    
    window.scrollTo(0,0);
    
    // jRespond
	var jRes = jRespond([{
        label: 'mobile',
        enter: 0,
        exit: 1023
	}]);
    
    // jPM Menu
    var jPM = $.jPanelMenu({
    	menu: '.nav',
    	trigger: '.nav-trigger',
    	direction: 'right',
    	keyboardShortcuts: false
	});
		
	if (Modernizr.touch) {
	
		jPM.on();
		
	} else {
	
		var html = $('html');
	
		function mobileOn() {
			jPM.on();
			html.removeClass('no-touch').addClass('touch');
			$('.nav a').click(function(e){
				e.preventDefault();
				var href = $(this).attr('href');
				$('.side-nav a[href="'+href+'"]').click();
			});
		}
		
		function mobileOff() {
			jPM.off();
			html.removeClass('touch').addClass('no-touch');
		}

		jRes.addFunc({
		    breakpoint: 'mobile',
		    enter: function() {
		        mobileOn();
		    },
		    exit: function() {
		        mobileOff();
		    }
		});
	
	}
		// One Page Nav
	var largeCircleClass = 'section-color-aqua';
	var largeCircle = $('.large-circle');
	
	function changeCircle($currentListItem) {
		largeCircle.removeClass(largeCircleClass);
		largeCircleClass = $currentListItem.attr('class');
		largeCircle.addClass(largeCircleClass);
	}
	
	// Hack to reset current item on scroll to top
	window.onscroll = function(ev)
	{
	var B= document.body;
	    var D= document.documentElement;
	    D= (D.clientHeight)? D: B;
	
	if (D.scrollTop == 0)
	    {
	        $('.section-color-aqua').removeClass('current');
	    }        
	};
	
	//$('.section-color-aqua').addClass('current');
	
	$('.side-nav ul').onePageNav({
		scrollOffset: 60,
		scrollChange: function($currentListItem) {
			changeCircle($currentListItem);
        }
	});
	
	$('.side-nav a').on('click', function(e){
		changeCircle($(this).parent());
	});
	
	$('.nav a, .nav-block a').click(function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		$('.side-nav a[href="'+href+'"]').click();
	});
	
	// Nav Section Hover
	var navSectionItem = $('.nav-block a');
	
	function hoverOn(_this) {
		$(_this).find('.nav-original').fadeOut(500);
		$(_this).find('.nav-hover').fadeIn(500);
	}
	
	function hoverOff(_this) {
		$(_this).find('.nav-hover').fadeOut(500);
		$(_this).find('.nav-original').fadeIn(500);
	}
	
	function randomize(count) {
		var randomNum = Math.floor(Math.random() * count);
		return randomNum;
	}
	
	navSectionItem.hover(function(){
		hoverOn(this);
		//$(this).find('.nav-original').stop().fadeOut(300);
		//$(this).find('.nav-hover').stop().fadeIn(300);
	}, function(){
		hoverOff(this);
		//$(this).find('.nav-hover').stop().fadeOut(300);
		//$(this).find('.nav-original').stop().fadeIn(300);
	});
	
	// Nav Section Random Animation
	var sectionCount = navSectionItem.length;
	
	setInterval(function() {
		var num = randomize(sectionCount);
		hoverOn(navSectionItem[num]);
		setTimeout(function(){
			hoverOff(navSectionItem[num]);
		}, 1500);
	}, 3000);
			
});