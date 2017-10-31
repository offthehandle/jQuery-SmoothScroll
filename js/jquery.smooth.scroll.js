﻿
/*
 * Smooth Scroll Utility for jQuery JavaScript Library
 * 
 * Copyright (c) 2014 - 2017 Adam J De Lucia
 * Licensed under the MIT License.
 * http://opensource.org/licenses/MIT
 * 
 * Author: Adam J De Lucia
 * Version: 1.1.0
 * Date: October 30, 2017
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
            stickyBox: false,
            stickyBoxId: 'ss-sticky-box',
            stickyBoxImageUrl: '/Content/images/smooth_scroll_arrow.png',
            stickyBoxThreshold: 50,
            stickyBoxDuration: 400,
            stickyBoxSetup: null,
            stickyBoxBeforeScroll: null,
            stickyBoxAfterScroll: null,
            stickyBoxOnResize: null,
            stickyBoxResizeTimeout: 250,
            pageTopLink: false,
            pageTopClass: 'page-top',
            pageTopDuration: 400,
            pageTopBeforeScroll: null,
            pageTopAfterScroll: null,
            offsetTop: 0
        }, options);

        // Evaluates and cleans user input for valid link selector assignment
        if (settings.bookmarks === true && typeof (settings.link) === 'string') {
            bookmarkLinkTrimmed = $.trim(settings.link);

            bookmarkLink = bookmarkLinkTrimmed;
        } else if (settings.bookmarks === true && typeof (settings.link) !== 'string') {
            bookmarkLink = '';
        }

        // Evaluates and cleans user input for valid top widget id assignment
        if (settings.stickyBox === true && typeof (settings.stickyBoxId) === 'string') {
            scrollBoxIdVal = settings.stickyBoxId.replace(/#/g, '');
            scrollBoxIdTrimmed = $.trim(scrollBoxIdVal);

            if (scrollBoxIdTrimmed !== '') {
                scrollBoxId = '#' + scrollBoxIdTrimmed;
            } else { scrollBoxId = scrollBoxIdTrimmed; }
        } else if (settings.stickyBox === true && typeof (settings.stickyBoxId) !== 'string') {
            scrollBoxId = '';
        }

        // Evaluates and cleans user input for valid page top class assignment
        if (settings.pageTopLink === true && typeof (settings.pageTopClass) === 'string') {
            topClassVal = settings.pageTopClass.replace(/\./g, '');
            topClassTrimmed = $.trim(topClassVal);

            if (topClassTrimmed !== '') {
                topClass = '.' + topClassTrimmed;
            } else { topClass = topClassTrimmed; }
        } else if (settings.pageTopLink === true && typeof (settings.pageTopClass) !== 'string') {
            topClass = '';
        }

        // Evaluates the plugin configuration and alerts user if problems are found
        if (settings.bookmarks === true && bookmarkLink === '' || settings.stickyBox === true && scrollBoxId === '' || settings.pageTopLink === true && topClass === '') {
            alert("Smooth Scroll has detected some problems with its current configuration. " +
                "At least one of the activated features is not configured properly. " +
                "Please review and correct your setup or the plugin might not behave as expected.");
        }

        // Executes the optimized resize event callback function if it is a function
        if ($.isFunction(settings.stickyBoxOnResize)) {
            $(window).resize(function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(resizeFunction, settings.stickyBoxResizeTimeout);
            });
        }

        // Executed if same page bookmarks are activated
        if (settings.bookmarks === true && bookmarkLink !== '') {
            // Executed if bookmarks are delimited by a list of containers
            if (settings.containersArray.length) {
                // Click event for all links in the containers list
                // except the excluded links, links in the excluded containers list, and the top widget and page top links
                $(settings.containersArray.toString())
                    .find($(bookmarkLink).not(settings.exclude.toString()))
                    .not($(scrollBoxId))
                    .not($(topClass))
                    .not($(settings.excludeWithin.toString()).find(bookmarkLink)).on('click.smoothScroll.bookmarks', function (e) {
                        e.preventDefault();
                        $this = $(this);

                        // Assigns bookmark location and passes it to the global scroll function
                        loc = $this.attr('href');
                        findBookmark($this, loc);
                    });
            } else {
                // Executed if containers list is empty
                $(settings.container)
                    .find($(bookmarkLink).not(settings.exclude.toString()))
                    .not($(scrollBoxId))
                    .not($(topClass))
                    .not($(settings.excludeWithin.toString()).find(bookmarkLink)).on('click.smoothScroll.bookmarks', function (e) {
                        e.preventDefault();
                        $this = $(this);

                        // Assigns bookmark location and passes it to the global scroll function
                        loc = $this.attr('href');
                        findBookmark($this, loc);
                    });
            }
        }

        // Executed if top widget is activated
        if (settings.stickyBox === true && scrollBoxId !== '') {
            // Build pattern that creates HTML for the widget
            // Creates the link and attaches it to the DOM
            scrollTopBtn = $('<div id="' + scrollBoxIdTrimmed + '">');
            scrollTopBtn.appendTo('body');
            // Creates the image
            scrollTopimg = $('<img />');
            // Sets the configurable path to the image source
            scrollTopimg.attr('src', settings.stickyBoxImageUrl);
            // Attaches the image to the link
            scrollTopimg.appendTo(scrollBoxId);

            // Click event for the top widget
            $(scrollBoxId).on('click.smoothScroll.stickyBox', function (e) {
                e.preventDefault();
                $this = $(this);

                // Top widget start callback
                $.isFunction(settings.stickyBoxBeforeScroll) && settings.stickyBoxBeforeScroll.call($this);

                // Top widget scroll
                $('html, body').stop().animate({ scrollTop: 0 }, settings.stickyBoxDuration);

                // Top widget complete callback
                // Timeout delays the callback until the scroll has time to finish
                setTimeout(function () {
                    $.isFunction(settings.stickyBoxAfterScroll) && settings.stickyBoxAfterScroll.call($this);
                }, settings.stickyBoxDuration);
            });

            // Hides top widget initially
            $(scrollBoxId).hide();

            // Computes the scroll distance and shows the top widget when the configured distance is reached
            $(window).scroll(function () {
                scrollPos = $(this).scrollTop();

                if (scrollPos >= settings.stickyBoxThreshold) {
                    $(scrollBoxId).show();
                } else { $(scrollBoxId).hide(); }
            });
        }

        // Executes the top widget setup function if it is a function and top widget is activated
        if (settings.stickyBox === true && scrollBoxId !== '') {
            $.isFunction(settings.stickyBoxSetup) && settings.stickyBoxSetup.call($(scrollBoxId));
        }

        // Executed if page top link is activated
        if (settings.pageTopLink === true && topClass !== '') {
            $(topClass).on('click.smoothScroll.pageTopLink', function (e) {
                e.preventDefault();
                $this = $(this);

                // Page top start callback
                $.isFunction(settings.pageTopBeforeScroll) && settings.pageTopBeforeScroll.call($this);

                // Page top scroll
                $('html, body').stop().animate({ scrollTop: 0 }, settings.pageTopDuration);

                // Page top complete callback
                // Timeout delays the callback until the scroll has time to finish
                setTimeout(function () {
                    $.isFunction(settings.pageTopAfterScroll) && settings.pageTopAfterScroll.call($this);
                }, settings.pageTopDuration);
            });
        }

        // Global bookmark function
        function findBookmark($this, loc) {
            // Removes problematic characters from bookmark names
            trimSlash = '/';
            trimmedLoc = loc.replace(trimSlash, '');
            // Computes the bookmark position with the configurable offset amount
            locPos = $(trimmedLoc).offset().top - settings.offsetTop;

            // Bookmark start callback
            $.isFunction(settings.beforeScroll) && settings.beforeScroll.call($this, loc);

            // Bookmark scroll
            $('html, body').stop().animate({ scrollTop: locPos }, settings.duration);

            // Bookmark complete callback
            // Timeout delays the callback until the scroll has time to finish
            setTimeout(function () {
                $.isFunction(settings.afterScroll) && settings.afterScroll.call($this, loc);
            }, settings.duration);
        }

        // Global resize event function
        function resizeFunction() {
            $.isFunction(settings.stickyBoxOnResize) && settings.stickyBoxOnResize.call($(scrollBoxId));
        };

        var $this,
            bookmarkLinkTrimmed,
            bookmarkLink,
            loc,
            trimSlash,
            trimmedLoc,
            locPos,
            scrollBoxIdVal,
            scrollBoxIdTrimmed,
            scrollBoxId,
            scrollPos,
            scrollTopimg,
            scrollTopBtn,
            resizeTimer,
            topClassVal,
            topClassTrimmed,
            topClass;
    };
}(jQuery));
