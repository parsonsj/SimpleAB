#SimpleAB

SimpleAB is an ultra-lightweight jQuery plugin designed to enable AB testing of different copy pages within one HTML document with as little code as possible. In fact, enabling SimpleAB takes only one line of code! It works by randomly hiding all but one of your copy pages, and supports persisting page choice to a cookie for a seamless user experience. This README will help get you started.

##Using SimpleAB

### Setting Up Your Copy Page
SimpleAB is built around the idea that you will have several copy variations living within one document. SimpleAB works by setting ```display:none``` on all copy versions except a randomly selected active one. Each copy variation needs a class indicating which copy version it belongs to; copy versions may be broken up so that you can seamlessly integrate them into your webpage template.

For example, you may have three different copy versions, and your template page may have a header section and a body section. The header section would contain a container element and corresponding copy version class for each of the three copy versions, and the body section would contain a container element with corresponding class for each version as well.

The syntax for copy version classes is ```prefix-versionnumber```, and the default prefix is ```simpleab```. For example, the default version four class is ```simpleab-4```. You may have an unlimited number of copy versions within one page.

Here is an example copy page so that you can see this in action:
```
<h1>SimpleAB Test Page</h1>
<p>
	There are three DIVs in this paragraph, but only one will be showing. SimpleAB has picked one. Whoa, magic!
	<div class="simpleab-1">
		This is DIV #1.
	</div>
	<div class="simpleab-2">
		This is DIV #2.
	</div>
	<div class="simpleab-3">
		This is DIV #3.
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

1. _(Required)_ ```classCount``` is an integer representing the number of copy versions that you set up in the document. This parameter is required, as simpleAB makes no attempt to count how many versions you have included. 

2. _(Optional)_ ```persist``` is a boolean indicating whether or not the random SimpleAB page selection should be persisted to (or loaded from) a cookie. If true, each of your users will see the same page in the same browser every time he or she visits your site for up to 90 days. If false, your users will see a different page each time. Default: true.

3. _(Optional)_ ```className``` is the class prefix for copy versions. Though "simpleab" makes the most sense to use, if you already have a "simpleab" class, you can change it to something more convenient. Default: simpleab

##Testing SimpleAB
SimpleAB makes it easy to test your copy versions' appearances, even with ```persist``` set to true. Simply include ```flip=true``` in your page's querystring, and SimpleAB will automatically increment your persisted copy version number by one (and save the new value). This makes it easy to iterate through all of your copy versions.

For example, if your SimpleAB page were at ```http://www.example.com/example1.html```, then the flip URL would be ```http://www.example.com/example1.html?flip=true```.