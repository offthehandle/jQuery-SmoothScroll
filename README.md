### Quick links
- [jQuery Smooth Scroll](#jquery-smooth-scroll)
- [Installation](#installation)
    - [Install with NuGet](#install-with-nuget)
- [Features](#features)
    - [Turning Features On](#turning-features-on)
        - [Enable or Disable Features Example](#enable-or-disable-features-example)
- [Options](#options)
    - [Common Options](#common-options)
        - [Duration](#duration)
        - [Callbacks](#callbacks)
    - [Bookmark Options](#bookmark-options)
        - [Container](#container)
        - [Containers Array](#containers-array)
        - [Link and Exclude](#link-and-exclude)
            - [Exclude Example](#exclude-example)
            - [Link Example](#link-example)
        - [Exclude Within](#exclude-within)
            - [Exclude Within Example](#exclude-within-example)
        - [Offset Top](#offset-top)
            - [Offset Top Example](#offset-top-example)
        - [Bookmark Callbacks](#bookmark-callbacks)
    - [Page Top Options](#page-top-options)
        - [Page Top Class](#page-top-class)
        - [Page Top Callbacks](#page-top-callbacks)
    - [Top Widget Options](#top-widget-options)
        - [Top Widget Id](#top-widget-id)
        - [Top Widget Image Url](#top-widget-image-url)
        - [Top Widget Threshold](#top-widget-threshold)
        - [Top Widget Callbacks](#top-widget-callbacks)
            - [Top Widget Setup](#top-widget-setup)
            - [Top Widget On Resize](#top-widget-on-resize)
                - [Top Widget On Resize Example](#top-widget-on-resize-example)
            - [Top Widget Resize Timeout](#top-widget-resize-timeout)

# jQuery Smooth Scroll

Smooth Scroll is a jQuery utility. Its [3 features listed below](#features) can be configured and turned on or off as you like.

## Installation
Installation is easy and takes only a small amount of configuration. The only dependency is jQuery 1.9.1 or later. The default configuration activates bookmarks on all page links. See below for a basic configuration.

```javascript
$(document).ready(function () {
  $.smoothScroll({
    link: '.smooth-scroll'
  });
});
```
This configuration will enable bookmarks with the default options on any link decorated with the `smooth-scroll` class.

##### Install with NuGet
To install Smooth Scroll, run the following command in the Package Manager Console:

```
PM> Install-Package jQuery.SmoothScroll
```

## Features
1. Bookmarks
2. To page top links
3. End of page link

Each of the 3 features of Smooth Scroll can be turned on or off. You can use a single feature, different combinations of features or use all 3 features together.

### Turning Features On
The only feature turned on by default is bookmarks. Each feature has a property that accepts a boolean value - `true` or `false` - to turn the feature on or off.

##### Enable or Disable Features Example
```javascript
$(document).ready(function () {
  $.smoothScroll({
      bookmarks: true | false,
      pageTopLink: true | false,
      topWidget: true | false,
  });
});
```


## Options
See below for the complete configuration with default settings.

```javascript
  bookmarks: true,
  container: 'html, body',
  containersArray: [],
  link: 'a',
  duration: 400,
  exclude: [],
  excludeWithin: [],
  beforeScroll: null,
  afterScroll: null,
  topWidget: false,
  topWidgetId: 'scroll-to-top',
  topWidgetImageUrl: '/Content/images/smooth_scroll_arrow.png',
  topWidgetThreshold: 50,
  topWidgetDuration: 400,
  topWidgetSetup: null,
  topWidgetBeforeScroll: null,
  topWidgetAfterScroll: null,
  topWidgetOnResize: null,
  topWidgetResizeTimeout: 250,
  pageTopLink: false,
  pageTopClass: 'page-top',
  pageTopDuration: 400,
  pageTopBeforeScroll: null,
  pageTopAfterScroll: null,
  offsetTop: 0
```

### Common Options
All 3 features have common options like duration and callbacks. These common options are independently configurable for each feature.

#### Duration
The `duration`, `pageTopDuration` and `topWidgetDuration` options specify the scroll speed.

#### Callbacks
Each feature has callbacks that allow you to set JavaScript functions to be executed each time a specific action takes place within the utility. All features execute functions before and after each Smooth Scroll. You can find callbacks for specific features below.
* Bookmarks: `beforeScroll`, `afterScroll`
* Page Top: `pageTopBeforeScroll`, `pageTopAfterScroll`
* Top Widget: `topWidgetSetup`, `topWidgetOnResize`

### Bookmark Options
* With Defaults

```javascript
  bookmarks: true,
  container: 'html, body',
  containersArray: [],
  link: 'a',
  duration: 400,
  exclude: [],
  excludeWithin: [],
  beforeScroll: null,
  afterScroll: null,
  offsetTop: 0
```

#### Container
The `container` option sets a CSS selector within which to look for all bookmark links.

#### Containers Array
The `containersArray` option allows an array of strings to be set for multiple containers. When the `container` or `containersArray` option is set, even a match to the `link` selector will not be activated if it is not found inside the container(s).

#### Link and Exclude
The `link` option specifies selectors that should have Smooth Scroll bookmarks enabled. When you enable `link` on generic elements - like `a` - you can exclude a subset of links that should not be Smooth Scroll enabled using the `exclude` option. See the use cases below.
* Exclude offsite links in a nav element

##### Exclude Example

###### HTML
```html
<nav>
  <ul>
    <li><a href="/#section-1">Section 1</a></li>
    <li><a href="/#section-2">Section 2</a></li>
    <li><a class="disable-smooth-scroll" href="http://www.offsite-link.com" target="_blank">Offsite Page</a></li>
  </ul>
</nav>
```

###### Smooth Scroll Options
```javascript
$(document).ready(function () {
  $.smoothScroll({
    container: 'nav',
    exclude: ['.disable-smooth-scroll']
  });
});
```

Another option is to create an opt-in class. Smooth Scroll simply provides options to suit your preference with the most efficient flow in mind for your project.

##### Link Example

###### HTML
```html
<nav>
  <ul>
    <li><a class="smooth-scroll" href="/#section-1">Section 1</a></li>
    <li><a class="smooth-scroll" href="/#section-2">Section 2</a></li>
    <li><a href="http://www.offsite-link.com" target="_blank">Offsite Page</a></li>
  </ul>
</nav>
```

###### Smooth Scroll Options
```javascript
$(document).ready(function () {
  $.smoothScroll({
    container: 'nav',
    link: '.smooth-scroll'
  });
});
```

#### Exclude Within
The `excludeWithin` option specifies an inner container of `containersArray` or `container` within which no bookmarks should be enabled. Below is a use case for this option.

##### Exclude Within Example

###### HTML
```html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">Brand</a>
    </div>

    <div class="collapse navbar-collapse" id="nav">
      <ul class="nav navbar-nav">
        <li><a href="/#section-1">Section 1</a></li>
        <li><a href="/#section-2">Section 2</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Plan Options <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="/basic-plan.html">Basic Plan</a></li>
            <li><a href="/pro-plan.html">Pro Plan</a></li>
            <li><a href="/premium-plan.html">Premium Plan</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

###### Smooth Scroll Options
```javascript
$(document).ready(function () {
  $.smoothScroll({
    container: '#nav',
    excludeWithin: '.dropdown'
  });
});
```

#### Offset Top
The `offsetTop` option is used to adjust the scroll position for fixed navbars. Set this option to the height of your fixed navbar to keep the top of bookmarked content visible on scroll, otherwise it will be hidden behind the navbar.

###### Offset Top Example
```javascript
$(document).ready(function () {
  $.smoothScroll({
    offsetTop: 50
  });
});
```

#### Bookmark Callbacks
The callbacks have 1 argument: `loc`, the href value of the element that triggered the scroll. The callbacks have `this` set to the specific jQuery Object that triggered the scroll.

### Page Top Options
The page top feature is used to trigger a scroll to page top from anywhere on the page.
* With Defaults

```javascript
  pageTopLink: false,
  pageTopClass: 'page-top',
  pageTopDuration: 400,
  pageTopBeforeScroll: null,
  pageTopAfterScroll: null,
```

#### Page Top Class
The `pageTopClass` specifies the class name that will be used to trigger a scroll to page top. The `.` is not required before the value since it must be a class name.

#### Page Top Callbacks
The callbacks have `this` set to the specific jQuery Object that triggered the scroll.

### Top Widget Options
The top widget is used to scroll back to page top and appears after the user has reached the bottom of the page, making it available when needed. It is created programmatically and provides some options to configure its setup.
* With Defaults

```javascript
  topWidget: false,
  topWidgetId: 'scroll-to-top',
  topWidgetImageUrl: '/Content/images/smooth_scroll_arrow.png',
  topWidgetThreshold: 50,
  topWidgetDuration: 400,
  topWidgetSetup: null,
  topWidgetBeforeScroll: null,
  topWidgetAfterScroll: null,
  topWidgetOnResize: null,
  topWidgetResizeTimeout: 250,
```

#### Top Widget Id
The `topWidgetId` specifies the id of the top widget element. The `#` is not required before the value since it is an id.

#### Top Widget Image Url
The `topWidgetImageUrl` specifies the path of the image to use as the scroll top arrow. An image is provided. If you use an image with a different name or location, update this option.

#### Top Widget Threshold
The `topWidgetThreshold` specifies the number of pixels the scroll position is from the bottom of the page when the widget appears.

#### Top Widget Callbacks

##### Top Widget Setup
The `topWidgetSetup` is a callback. It fires on page start after the widget is created. The value of `this` is set to the jQuery Object of the top widget by its CSS id; e.g. `$(#scroll-to-top)`.

##### Top Widget On Resize
The `topWidgetOnResize` is a callback. It fires on page resize to provide a hook for positioning the top widget. The value of `this` is set to the jQuery Object of the top widget by its CSS id; e.g. `$(#scroll-to-top)`.

###### Top Widget On Resize Example
```javascript
$(document).ready(function () {
  $.smoothScroll({
    topWidgetOnResize: function () {
      this.css('right', $('.container').offset().left + 15 + 'px');
    }
  });
});
```

##### Top Widget Resize Timeout
The `topWidgetResizeTimeout` is the duration of the timeout to optimize the `topWidgetOnResize` callback. You can delay the execution of the callback to allow other resize events to complete by setting this value higher. Setting it to 0 will execute the callback immediately.
