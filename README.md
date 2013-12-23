SimpleAB
========

SimpleAB is a simple jQuery plugin designed for AB testing. It is incredibly lightweight and makes it easier to determine which set of copy best sells a product.

Using SimpleAB
--------

### Setting Up Your Copy Page
SimpleAB is built around the idea that you will have several versions of the same page living within one page. SimpleAB works by setting ```display:none``` on all page versions except a randomly selected active one. Every page (pages may be broken up, i.e. you may have 5 DIVs that belong to each page) needs two additional classes to work with SimpleAB: ```simpleab``` and ```simpleab-pagenumber```. For example, you should add ```simpleab simpleab-2``` to all HTML associated solely with page 2. SimpleAB page indices are _one-based_.

Here is an example copy page, taken from simpleab-test.html:
```
<h1>SimpleAB Test Page</h1>
<p>
	There are three DIVs in this paragraph, but only one will be showing. SimpleAB has picked one at random. Whoa, magic!
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

Please keep in mind that you should design your copy page so that page layout elements wrap around individual pages. For example, if you have a big header bar, then you should have copy for each of your three "pages" inside of different ```simpleab simpleab-pagenumber``` class elements within the header bar.

### Making the JavaScript Work

First, you should include jQuery in your HTML page _before_ you include SimpleAB, then include simpleab.js.
```
<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
<script src="simpleab.js"></script>
```

Then, you just need to set up a call to SimpleAB in the document ready event handler:

```
$(document).ready(function(){
	$.simpleAB(n, p);
});
```

The ```$.simpleAB``` method takes two arguments:
1. n is the number of pages you set up in the document. For instance, if you added simpleab-1, simpleab-2, and simpleab-3 pages, then n would be three (3).
2. p is a boolean indicating whether or not the random SimpleAB page selection should be persisted in a cookie. If true, each of your users will see the same page in the same browser for 90 days. If false, each of your users will get a different page each time he or she visits your site.
