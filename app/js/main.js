/* jshint devel:true */

console.log('Look at app/js/main.js');

(function (){

    'use strict';
    var $ = require('jquery');
    var flickrFun = {};

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

    flickrFun.pollFlickrBuild = function (){
        var imageStack='';
        $.getJSON( 'http://api.flickr.com/services/feeds/photos_public.gne?tags=storm&tagmode=any&format=json&jsoncallback=?', function( data ) {
            $(data.items).each(function(i, o) {
                imageStack += '<div class="mod"><figure><div class="imgWrap"><img class="lazy" src="'+o.media.m+'"/></div> <figcaption>'+o.title+'</figcaption></figure></div>';
                //imageStack += '<div class="mod"><figure><div class="imgWrap"><img class="lazy" src="images/loader.gif" data-src="'+o.media.m+'"/></div> <figcaption>'+o.title+'</figcaption></figure></div>';
            });
            if (imageStack==='') {
                $('#flickr').html('Error');
                return;
            }
            $('#flickr').append(imageStack);
        });
    };

    return flickrFun.init();

}());
