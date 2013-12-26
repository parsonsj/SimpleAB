#SimpleAB

SimpleAB is an ultra-lightweight jQuery plugin designed to enable AB testing of different sales copy within one HTML document with as little code as possible. In fact, enabling SimpleAB takes only one line of code! It works by choosing only one copy variation to display for a user at a particular time, and supports persisting page choice to a cookie for a seamless user experience. This README will help get you started.

##Using SimpleAB

### Setting Up Your Copy Page
SimpleAB is built around the idea that you will have several copy variations living within one document. It works by randomly swapping in and out associated HTML elements. Only one group of associated HTML elements is displayed at once; all of the rest are hidden with ```display:none```.

You can associate HTML elements by giving them the same SimpleAB class. SimpleAB classes are named in a ```classname-groupnumber``` format.

The default class name is ```simpleab```. You may have as many groups as you want, but only one group is shown at once. You should separate your copy variations by assigning each a different group number.

Here is an example copy page so that you can see this in action:
```
<h1>SimpleAB Test Page</h1>
<p>
	There are three DIVs in this paragraph, but only one will be showing. SimpleAB has picked one. Whoa, magic!
	<div class="simpleab-1">
		This is copy variation 1. Some product costs $20.
	</div>
	<div class="simpleab-2">
		This is copy variation 2. Some product costs $30.
	</div>
	<div class="simpleab-3">
		This is copy variation 3. Some product costs $10. Wow, you're lucky!
	</div>
</p>
```

The above page will display only one of the three DIVs with a ```simpleab-number``` class on it.

### Making the JavaScript Work

First, you should include jQuery in your HTML page _before_ you include SimpleAB, then include simpleab.js.
```
<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
<script src="simpleab.js"></script>
```

Then, you just need to set up a call to SimpleAB in the document ready event handler:

```
$(document).ready(function(){
	$.simpleAB({
		classCount: integer,
		persist: boolean,
		className: string
	});
});
```

The ```$.simpleAB``` method takes three parameters:

1. _(Required)_ ```classCount``` is an integer representing the number of groups that you set up in the document. This parameter is required.

2. _(Optional)_ ```persist``` is a boolean indicating whether or not the random SimpleAB group selection should be persisted to (or loaded from) a cookie. If true, each of your users will see the same page in the same browser every time he or she visits your site for up to 90 days. If false, SimpleAB will choose a page upon each visit Default: true.

3. _(Optional)_ ```className``` is the first part of the SimpleAB group class name. Though "simpleab" makes the most sense to use, if you already have a "simpleab-" class, you can change it to something more convenient. Default: "simpleab"

##Testing SimpleAB
SimpleAB makes it easy to test your copy variations' appearances, even with ```persist``` set to true. Simply include ```flip=true``` in your page's querystring, and SimpleAB will automatically increment your persisted copy version number by one (and save the new value). This makes it easy to iterate through all of your copy versions.

For example, if your SimpleAB page were at ```http://www.example.com/example1.html```, then the flip URL would be ```http://www.example.com/example1.html?flip=true```.

##Issues
SimpleAB will hide any elements whose classes contain ```classname-``` (where classname is the SimpleAB group association class prefix)--even if they are not associated with SimpleAB. You should fix this by changing the className initialization parameter and altering your group association classes accordingly.
