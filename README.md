### Quick links
- [jQuery Smooth Scroll](#jquery-smooth-scroll)
- [Installation](#installation)
    - [Install with NuGet](#install-with-nuget)
- [Options](#options)
    - [Container](#container)
    - [Containers Array](#containers-array)
    - [Exclude](#exclude)
        - [Example 1](#example-1)
        - [Example 2](#example-2)
    - [Exclude Within](#exclude-within)
        - [Example](#example)

# jQuery Smooth Scroll

Smooth Scroll is a jQuery utility. Its 3 features listed below can be configured and turned on or off as you like.
1. Bookmarks
2. To page top links
3. End of page link

## Installation
Installation is easy and takes only a small amount of configuration. The only dependency is jQuery 1.9.1 or later. The default configuration activates Smooth Scroll on all page links. See below for a basic configuration.

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

### Container
The `container` option sets a CSS selector within which all bookmark links will be contained.

### Containers Array
The `containersArray` option allows an array of strings to be set for multiple containers. When the `container` or `containersArray` option is set, even a match to the `link` selector will not be activated unless it exists inside the specified container(s).

### Exclude
The `exclude` option specifies selectors that should not be Smooth Scroll enabled. Below is a use case for this option.
* Exclude offsite links in a nav element

#### Example 1

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

Another options is to create an opt-in class. Smooth Scroll simply provides options to suit your preference with the most efficient flow in mind for your project.

#### Example 2

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

### Exclude Within
The `excludeWithin` option specifies an inner container of `containersArray` or `container` within which no bookmarks should be enabled. Below is a use case for this option.

#### Example

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
