jquery.CssBgSlideshow.js
========================

Usage:
```javascript
$(document).ready(function() {
  $('#slideshow').bgSlideshow(options);
});
```

HTML:
```html
<div id="slideshow"></div>
```

Options:
```javascript
var otpions = {
  	speed: 5000, // time between transitions
		fadeSpeed: 1000, //duration of the transition
		transition: 'fade', // if different than fade nedd to include jquery UI Effects
		navigation: true, // show navigation buttons
		navPlay: 'img/btn_play.png', // play button path
		navStop: 'img/btn_pause.png', // pause button path
		title: true, // shows title for the image
		linkUrl:true, // links title to the specified url
		text: true, // shows text for the image
		backgroundCover: true, // adds background-size:cover css3 - For IR 6/7/8 check https://github.com/louisremi/jquery.backgroundSize.js
		photos: [ {
					"title" : "Title 1",
					"image" : "path/to/first/image.jpg", 
					"url" : "http://www.link_to_url.com",
					"text" : "Text for the image"
				   }, {
  				"title" : "Title 2",
					"image" : "path/to/second/image.jpg", 
					"url" : "http://www.link_to_url.com",
					"text" : "Text for the image"
				   }]
};

```
