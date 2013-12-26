// simpleab.js: A simple AB testing JavaScript library
// Copyright (c) 2013 John Parsons. All rights reserved.
// You may use SimpleAB under the terms of the MIT license.
// See LICENSE for more information.

(function($){
	// Defines the simpleAB plugin method.
	// params: parameters for simpleAB
	// See documentation for more information.
	$.simpleAB = function(params){
		// Load up the params
		this.persist = true;
		this.className = "simpleab";
		this.disableFlip = false;

		$.extend(this, params);
		
		// Handle errors in input
		if(typeof(this.classCount) !== "number"){
			throw "SimpleAB: did not specify a number of pages (set classCount in the params to fix this error)";
		}
		
		if(this.classCount <= 0){
			// We can't deal with fewer than zero or zero items
			throw "SimpleAB: need at least one page but got " + n.toString();
		}

		if(typeof(this.persist) !== "boolean"){
			throw "SimpleAB: did not specify a boolean value for persist";
		}

		if(typeof(this.disableFlip) !== "boolean"){
			throw "SimpleAB: did not specify a boolean value for disableFlip";
		}

		if(typeof(this.className) !== "string" || this.className === ""){
			throw "SimpleAB: invalid class name";
		}
		
		// Random page
		var selectedItem = Math.floor((Math.random() * this.classCount) + 1);

		// Load persisted cookie if instructed to do so.
		if(this.persist === true && document.cookie.indexOf("simpleab-index") != -1){
			var cookies = document.cookie.split(";");
			for(x in cookies){
				if (cookies[x].indexOf("simpleab-index") != -1){
					selectedItem = parseInt(cookies[x].split("=")[1].trim());
				}
			}	
		}

		// Check for flip. If flip is enabled, then we increment the cookie.
		if(this.disableFlip === false && this.persist == true && window.location.href.indexOf("flip=true") !== -1){
			if(++selectedItem > this.classCount) selectedItem = 1;
		}

		if (this.persist === true){
			// Save the value we just generated
			var expireTime = new Date();
			expireTime.setTime(expireTime.getTime() + (90 * 24 * 60 * 60 * 1000)); // Set cookie to expire in 90 days
			document.cookie = "simpleab-index=" + selectedItem.toString() + "; expires=" + expireTime.toGMTString() + "; path=/";
		}

		var selectedClass = this.className + "-" + selectedItem.toString();

		// Hide all classes except the one we want to display (on which we call show())
		$("[class*=\"" + this.className + "-\"]").each(function(){
			if(!$(this).hasClass(selectedClass)){
				$(this).hide();
			}
			else{
				$(this).show();
			}
		});

		return this;
	}
})(jQuery);
