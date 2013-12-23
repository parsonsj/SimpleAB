// simpleab.js: A simple AB testing JavaScript library
// Copyright (c) 2013 John Parsons. All rights reserved.

(function($){
	// Defines the simpleAB plugin method
	// n: The number of cases with which we have to deal. Should be one-based; class indicies in the page should also be one-based.
	// p: Whether or not to persist changes in a cookie.
	$.simpleAB = function(n, p){
		if(n <= 0){
			// We can't deal with fewer than zero or zero items
			throw "SimpleAB: need at least one page but got " + n.toString();
		}
		if(typeof(n) !== "number"){
			throw "SimpleAB: did not specify a number of pages";
		}
		if(typeof(p) !== "boolean"){
			throw "SimpleAB: did not specify a boolean value for whether to use cookies";
		}

		// Random page
		var selectedItem = Math.floor((Math.random() * n) + 1);
		var selectedClass = "simpleab-" + selectedItem.toString();

		// Load persisted cookie if instructed to do so.
		if(p===true && document.cookie.indexOf("simpleab-index") != -1){
			var cookies = document.cookie.split(";");
			for(x in cookies){
				if (cookies[x].indexOf("simpleab-index") != -1){
					selectedClass = "simpleab-" + cookies[x].split("=")[1].trim();
				}
			}	
		}
		else if (p === true){
			// Save the value we just generated
			var expireTime = new Date();
			expireTime.setTime(expireTime.getTime() + (90 * 24 * 60 * 60 * 1000)); // Set cookie to expire in 90 days
			document.cookie = "simpleab-index=" + selectedItem.toString() + "; expires=" + expireTime.toGMTString() + "; path=/";
		}

		// Hide all classes except the one we want to display
		$(".simpleab").each(function(){
			if(!$(this).hasClass(selectedClass)){
				$(this).css("display", "none");
			}
		});

		return this;
	}
})(jQuery);