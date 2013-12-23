#SimpleAB

SimpleAB is a simple jQuery plugin designed for AB testing. It is incredibly lightweight and makes it easier to determine which set of copy best sells a product.

##Using SimpleAB

### Setting Up Your Copy Page
SimpleAB is built around the idea that you will have several versions of the same page living within one page. SimpleAB works by setting ```display:none``` on all page versions except a randomly selected active one. Every page (pages may be broken up, i.e. you may have 5 DIVs that belong to each page) needs two additional classes to work with SimpleAB: a class indicating that the element is part of a SimpleAB page and a class indicating the page of which the element is a part. The default class names are ```simpleab``` and ```simpleab-pagenumber```, but this is customizable, as you will see.

For example, you should add ```simpleab simpleab-2``` to all HTML associated solely with page 2. SimpleAB page indices are _one-based_.

Here is an example copy page:
```
<h1>SimpleAB Test Page</h1>
<p>
	There are three DIVs in this paragraph, but only one will be showing. SimpleAB has picked one. Whoa, magic!
	<div class="simpleab simpleab-1">
		This is DIV #1.
	</div>
	<div class="simpleab simpleab-2">
		This is DIV #2.
	</div>
	<div class="simpleab simpleab-3">
		This is DIV #3.
	</div>
</p>
```

Please keep in mind that you should design your copy page so that page layout elements wrap around individual pages. For example, if you have a big header bar, then you should have copy for each of your three "pages" inside of different ```pagenumber``` elements within the header bar.

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

1. ```classCount``` is an integer representing the number of pages that you set up in the document. This parameter is required, as simpleAB makes no attempt to count how many pages you have included. 

2. ```persist``` is a boolean indicating whether or not the random SimpleAB page selection should be persisted to (or loaded from) a cookie. If true, each of your users will see the same page in the same browser every time he or she visits your site for up to 90 days. If false, your users will see a different page each time. Default: false.

3. ```className``` is a string indicating what class name SimpleAB should use for selecting pages. For instance, if you set this 

##Testing SimpleAB
SimpleAB makes it easy to test your pages, even with ```persist``` set to true. Simply include ```flip=true``` in your page's querystring, and SimpleAB will automatically increment your persisted page number by one. This allows you to quickly view all of your pages.

For example, if your SimpleAB page were at ```http://www.example.com/example1.html```, then the flip URL would be ```http://www.example.com/example1.html?flip=true```.
