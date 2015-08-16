/* jshint devel:true */

(function (){

    'use strict';
    var $ = require('jquery'),
        Mustache = require('mustache'),
        imageFeed = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=billmurray&tagmode=any&format=json&jsoncallback=?',
        flickrFun = {};

    /*-----------------------------------------------------------------------------------
    :: INIT
    ---------------------------------------------------------------------------------- */

    flickrFun.init = function () {
        $(document).on('ready', flickrFun.ready);

        $(window).on('resize', flickrFun.resize);

        $(window).on('load', flickrFun.load);
    };


    /*-----------------------------------------------------------------------------------
    :: READY
    ---------------------------------------------------------------------------------- */

    flickrFun.ready = function () {
        flickrFun.myFunc();
        flickrFun.pollFlickrBuild();
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
    :: MY FUNCTIONS
    ---------------------------------------------------------------------------------- */
    flickrFun.myFunc = function () {
        console.log('front end js running');
    };

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
        });
    };

    flickrFun.getSetSearch = function (){
        var searchTerm = $('#searchTerm').val(),
            searchHeader = $('#searchHeader span');
        imageFeed = 'http://api.flickr.com/services/feeds/photos_public.gne?tags='+searchTerm+'&tagmode=any&format=json&jsoncallback=?';
        searchHeader.text(searchTerm);
        flickrFun.pollFlickrBuild();
    };

    return flickrFun.init();

}());
