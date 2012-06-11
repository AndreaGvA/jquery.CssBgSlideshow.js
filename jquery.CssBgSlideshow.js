(function($) {
function _debug(msg)
{
if(window.console) {
console.debug(msg);
} else {
alert (msg);
}
};

jQuery.fn.bgSlideshow = function(options) {
	var defaults = {
		speed: 5000,
		fadeSpeed: 1000,
		transition: 'fade', // if different needs jquery UI Effects
		navigation: true,
		navPlay: 'images/btn_play.png',
		navStop: 'images/btn_pause.png',
		title: true,
		linkUrl:true,
		text: true,
		backgroundCover: true,
		photos: [ {
					"title" : "Stairs",
					"image" : "public/top_banner/img_f22969b9cb.JPG", 
					"url" : "http://www.sxc.hu/photo/1271909",
					"text" : "Going on"
				   }]
	};
	
	var o = jQuery.extend(defaults, options);
	return this.each (function() {
		var e= jQuery(this);
		
		e.append('<div  id="headerimg1" class="headerimg"></div>');
		e.append('<div  id="headerimg2" class="headerimg"></div>');
		if(o.navigation==true) {
			e.append("<div id='slideNav'><div id='slideBack' class='slideButton'></div><div id='slideToggle' class='slideButton'></div><div id='slideNext' class='slideButton'></div></div>");
		}
		if(o.title==true)
		{
			e.append('<div id="slideTitle"></div>');	
		}
		if(o.text==true)
		{
			e.append('<div id="slideText"></div>');	
		}
		
		// Backwards navigation
		$("#slideBack").click(function() {
			stopAnimation();
			navigate("back");
		});
	
		// Forward navigation
		$("#slideNext").click(function() {
			stopAnimation();
			navigate("next");
		});
		
		var interval;
		$("#slideToggle").toggle(function(){
			stopAnimation();
		}, function() {
			// Change the background image to "pause"
			$(this).css({ "background-image" : "url("+ o.navStop +")" });
			
			// Show the next image
			navigate("next");
			
			// Start playing the animation
			interval = setInterval(function() {
				navigate("next");
			}, o.speed);
		});
		
		var activeContainer = 1;	
		var currentImg = 0;
		var animating = false;
		var navigate = function(direction) {
			// Check if no animation is running. If it is, prevent the action
			if(animating) {
				return;
			}
			
			// Check which current image we need to show
			if(direction == "next") {
				currentImg++;
				//_debug(o.photos.length + 1);
				if(currentImg == o.photos.length + 1) {
					currentImg = 1;
				}
			} else {
				currentImg--;
				if(currentImg == 0) {
					currentImg = o.photos.length;
				}
			}
			
			// Check which container we need to use
			var currentContainer = activeContainer;
			if(activeContainer == 1) {
				activeContainer = 2;
			} else {
				activeContainer = 1;
			}
			showImage(o.photos[currentImg - 1], currentContainer, activeContainer);
			
		};
		
		var currentZindex = -1;
		var showImage = function(photoObject, currentContainer, activeContainer) {
			animating = true;
			
			// Make sure the new container is always on the background
			currentZindex--;
			
			// Set the background image of the new active container
			$('#headerimg' + activeContainer).css({
				"background" : "url(" + photoObject.image + ") center center",
				"display" : "block",
				"z-index" : currentZindex,
			});
			// set background-size to "cover" if otion value is true
			if(o.backgroundCover==true) {
				$('#headerimg' + activeContainer).css( "background-size", "cover" );
			}
			
			// Hide the header text
			if(o.title==true) {
				$("#slideTitle").fadeOut(o.fadeSpeed);
			}
		
			if(o.text==true) {
				$("#slideText").fadeOut(o.fadeSpeed);
			}
			// Fade out the current container
			// and display the header text when animation is complete
			if(o.transition=='fade') {
				$('#headerimg' + currentContainer).fadeOut(o.fadeSpeed, function() {
					setTimeout(function() {
						if(o.title==true) {
							if(o.linkUrl==true) {
								$("#slideTitle").html('<a href="' + photoObject.url + '" target="_blank">' + photoObject.title + '</a>');
							} else {
								$("#slideTitle").html(photoObject.title);
							}
							$("#slideTitle").fadeIn(o.fadeSpeed);
						}
						if(o.text==true) {
							$("#slideText").html(photoObject.text);
							$("#slideText").fadeIn(o.fadeSpeed);
						}
						animating = false;
					});
				});
			} else {
				$('#headerimg' + currentContainer).hide(o.transition, {}, o.fadeSpeed, function() {
					setTimeout(function() {
						if(o.title==true) {
							if(o.linkUrl==true) {
								$("#slideTitle").html('<a href="' + photoObject.url + '" target="_blank">' + photoObject.title + '</a>');
							} else {
								$("#slideTitle").html(photoObject.title);
							}
							$("#slideTitle").fadeIn(o.fadeSpeed);
						}
						if(o.text==true) {
							$("#slideText").html(photoObject.text);
							$("#slideText").fadeIn(o.fadeSpeed);
						}
						animating = false;
					});
				});
			}
		}; 
		
		var stopAnimation = function() {
			// Change the background image to "play"
			$("#slideToggle").css({ "background-image" : "url("+ o.navPlay +")" });
			
			// Clear the interval
			clearInterval(interval);
		};
		
		// We should statically set the first image
		navigate("next");
		
		// Start playing the animation
		interval = setInterval(function() {
			navigate("next");
		}, o.speed);	
			
		});
	};

})(jQuery)

