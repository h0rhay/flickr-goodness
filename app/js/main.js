/* jshint devel:true */

(function (){

    'use strict';
    var $ = require('jquery'),
        Mustache = require('mustache'),
        imageFeed = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=kitesurf&tagmode=any&format=json&jsoncallback=?',
        flickrFun = {};

    /*-----------------------------------------------------------------------------------
    :: INIT
    ---------------------------------------------------------------------------------- */

    flickrFun.init = function () {
        $(document).on('ready', flickrFun.ready);

        $(window).on('resize', flickrFun.resize);

        $(window).on('load', flickrFun.load);

        $(window).on('scroll', flickrFun.scroll);
    };


    /*-----------------------------------------------------------------------------------
    :: READY
    ---------------------------------------------------------------------------------- */

    flickrFun.ready = function () {
        flickrFun.pollFlickrBuild();
        flickrFun.swapSrc();
        $('html').on('click','#fireSearch', flickrFun.getSetSearch);
        $('html').on('keypress', function(e) {
            if(e.which === 13) {
                flickrFun.getSetSearch();
            }
        });
    };


    /*-----------------------------------------------------------------------------------
    :: RESIZE
    ---------------------------------------------------------------------------------- */

    flickrFun.resize = function () {
        //flickrFun.myFunction1();
    };


    /*-----------------------------------------------------------------------------------
    :: LOAD
    ---------------------------------------------------------------------------------- */

    flickrFun.load = function () {
        //flickrFun.myFunction1();

    };

    /*-----------------------------------------------------------------------------------
    :: SCROLL
    ---------------------------------------------------------------------------------- */

    flickrFun.scroll = function () {
        flickrFun.swapSrc();
    };


    /*-----------------------------------------------------------------------------------
    :: MY FUNCTIONS
    ---------------------------------------------------------------------------------- */

    /*---  Way of the Jquery ---*/
    // flickrFun.pollFlickrBuild = function (){
    //     var imageStack='';
    //     $.getJSON( 'http://api.flickr.com/services/feeds/photos_public.gne?tags=storm&tagmode=any&format=json&jsoncallback=?', function( data ) {
    //         $(data.items).each(function(i, o) {
    //             imageStack += '<div class="mod"><figure><div class="imgWrap"><img class="lazy" src="'+o.media.m+'"/></div> <figcaption>'+o.title+'</figcaption></figure></div>';
    //             //imageStack += '<div class="mod"><figure><div class="imgWrap"><img class="lazy" src="images/loader.gif" data-src="'+o.media.m+'"/></div> <figcaption>'+o.title+'</figcaption></figure></div>';
    //         });
    //         if (imageStack==='') {
    //             $('#flickr').html('Error');
    //             return;
    //         }
    //         $('#flickr').append(imageStack);
    //     });
    // };

    /*---  Way of the Mustache = Better! ;) ---*/
    flickrFun.pollFlickrBuild = function (){
        $.getJSON(imageFeed, function(data) {
            var template = $('#image-template').html(),
                info = Mustache.to_html(template, data);
            $('#flickr').html(info);
            flickrFun.swapSrc();
            flickrFun.removeUnwanted();
            flickrFun.fixAuthorLinks();
        });
    };

    flickrFun.removeUnwanted = function (){
        $('.flickrAuthor').each(function (i,o){
            var $this = $(o);
            if($this.html().indexOf("nobody@flickr.com ")!=-1)
            $this.html($this.html().replace("nobody@flickr.com ", ""));
        });
    }

    // A quick fix to get around flickr API's 'nobody@flickr.com' security policy
    // This chops off the image id from the title link creating a usable author link for now.. ;)
    flickrFun.fixAuthorLinks = function (){
        var goodLink = '';
        $('.flickrTitle').each(function(i,o){
            goodLink = $(o).attr('href');
            goodLink = (goodLink.substr(0, goodLink.length - 1));
            goodLink = (goodLink.substr(0, goodLink.lastIndexOf('/')));
        });
        $('.flickrAuthor').each(function(i,o){
            $(o).attr('href', goodLink);
        });
    }

    flickrFun.getSetSearch = function (){
        var searchTerm = $('#searchTerm').val(),
            searchHeader = $('#searchHeader span');
        imageFeed = 'http://api.flickr.com/services/feeds/photos_public.gne?tags='+searchTerm+'&tagmode=any&format=json&jsoncallback=?';
        searchHeader.text(searchTerm);
        flickrFun.pollFlickrBuild();
    };

    flickrFun.checkViz = function ( elm, ev ) {
        var ev = ev || 'visible';
        var vpH = $(window).height(), // Viewport Height
            st = $(window).scrollTop(), // Scroll Top
            y = $(elm).offset().top,
            elementHeight = $(elm).height();

        if (ev === 'visible') return ((y < (vpH + st)) && (y > (st - elementHeight)));
        if (ev === 'above') return ((y < (vpH + st)));
    }

    flickrFun.swapSrc = function(){
        console.log('swapSrc running');
        $('.mod').each(function(i,o){
            var $this = $(o),
                $thisImg = $this.find('img'),
                nuImage = $thisImg.attr('data-src');
            if (flickrFun.checkViz($this)) {
                console.log('visible');
                console.log(nuImage);
                $thisImg.attr('src', nuImage);
            }
        });
    }

    return flickrFun.init();

}());
