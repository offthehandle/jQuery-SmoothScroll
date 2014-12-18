
/*
 * Smooth Scroll Utility for jQuery JavaScript Library
 * 
 * Copyright (c) 2014 Adam J De Lucia
 * Licensed under the MIT License.
 * http://opensource.org/licenses/MIT
 * 
 * Author: Adam J De Lucia
 * Version: 1.0.0
 * Date: December 17, 2014
 * 
 */

(function ($) {
    $.smoothScroll = function (options) {
        var settings = $.extend({
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
            topWidgetBeforeScroll: null,
            topWidgetAfterScroll: null,
            pageTopLink: false,
            pageTopClass: 'page-top',
            pageTopDuration: 400,
            pageTopBeforeScroll: null,
            pageTopAfterScroll: null,
            offsetTop: 0
        }, options);

        // Executed if same page bookmarks are activated
        if (settings.bookmarks === true) {
            // Executed if bookmarks are delimited by a list of containers
            if (settings.containersArray.length) {
                // Click event for all links in the containers list
                // except the excluded links, links in the excluded containers list, and the top widget and page top links
                $(settings.containersArray.toString())
                    .find($(settings.link).not(settings.exclude.toString()))
                    .not($('#' + settings.topWidgetId))
                    .not($('.' + settings.pageTopClass))
                    .not($(settings.excludeWithin.toString()).find(settings.link)).on('click.smoothScroll', function (e) {
                        e.preventDefault();

                        // Assigns bookmark location and passes it to the global scroll function
                        loc = $(this).attr('href');
                        findBookmark(loc);
                    });
            } else {
                // Executed if containers list is empty
                $(settings.container)
                    .find($(settings.link).not(settings.exclude.toString()))
                    .not($('#' + settings.topWidgetId))
                    .not($('.' + settings.pageTopClass))
                    .not($(settings.excludeWithin.toString()).find(settings.link)).on('click.smoothScroll', function (e) {
                        e.preventDefault();

                        // Assigns bookmark location and passes it to the global scroll function
                        loc = $(this).attr('href');
                        findBookmark(loc);
                    });
            }
        }

        // Executed if top widget is activated
        if (settings.topWidget === true) {
            // Build pattern that creates HTML for the widget
            // Creates the link and attaches it to the DOM
            scrollTopBtn = $('<div id="' + settings.topWidgetId + '">');
            scrollTopBtn.appendTo('body');
            // Creates the image
            scrollTopimg = $('<img />');
            // Sets the configurable path to the image source
            scrollTopimg.attr('src', settings.topWidgetImageUrl);
            // Attaches the image to the link
            scrollTopimg.appendTo('#' + settings.topWidgetId);

            // Click event for the top widget
            $('#' + settings.topWidgetId).on('click.smoothScroll', function (e) {
                e.preventDefault();

                // Top widget start callback
                $.isFunction(settings.topWidgetBeforeScroll) && settings.topWidgetBeforeScroll.call(this);

                // Top widget scroll
                $('html, body').stop().animate({ scrollTop: 0 }, settings.topWidgetDuration);

                // Top widget complete callback
                // Timeout delays the callback until the scroll has time to finish
                setTimeout(function () {
                    $.isFunction(settings.topWidgetAfterScroll) && settings.topWidgetAfterScroll.call(this);
                }, settings.topWidgetDuration);
            });

            // Hides top widget initially
            $('#' + settings.topWidgetId).hide();

            // Computes the scroll distance and shows the top widget after the configured distance is reached
            $(window).scroll(function () {
                scrollPos = $(this).scrollTop();

                if (scrollPos >= settings.topWidgetThreshold) {
                    $('#' + settings.topWidgetId).show();
                } else { $('#' + settings.topWidgetId).hide(); }
            });
        }

        // Executed if page top link is activated
        if (settings.pageTopLink === true) {
            $('.' + settings.pageTopClass).on('click.smoothScroll', function (e) {
                e.preventDefault();

                // Page top start callback
                $.isFunction(settings.pageTopBeforeScroll) && settings.pageTopBeforeScroll.call(this);

                // Page top scroll
                $('html, body').stop().animate({ scrollTop: 0 }, settings.pageTopDuration);

                // Page top complete callback
                // Timeout delays the callback until the scroll has time to finish
                setTimeout(function () {
                    $.isFunction(settings.pageTopAfterScroll) && settings.pageTopAfterScroll.call(this);
                }, settings.pageTopDuration);
            });
        }

        // Global bookmark event
        function findBookmark(loc) {
            // Removes problematic characters from bookmark names
            trimSlash = '/';
            trimmedLoc = loc.replace(trimSlash, '');
            // Computes the bookmark position with the configurable offset amount
            locPos = $(trimmedLoc).offset().top - settings.offsetTop;

            // Bookmark start callback
            $.isFunction(settings.beforeScroll) && settings.beforeScroll.call(this);

            // Bookmark scroll
            $('html, body').stop().animate({ scrollTop: locPos }, settings.duration);

            // Bookmark complete callback
            // Timeout delays the callback until the scroll has time to finish
            setTimeout(function () {
                $.isFunction(settings.afterScroll) && settings.afterScroll.call(this);
            }, settings.duration);
        }

        var loc,
            trimSlash,
            trimmedLoc,
            locPos,
            scrollPos,
            scrollTopimg,
            scrollTopBtn;
    };
}(jQuery));
