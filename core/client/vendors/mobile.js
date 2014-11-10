(function () {
    'use strict';

    FastClick.attach(document.body);

    // ### general wrapper to handle conditional screen size actions
    function responsiveAction(event, mediaCondition, cb) {
        if (!window.matchMedia(mediaCondition).matches) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        cb();
    }

    // ### Show content preview when swiping left on content list
    $('#manage').on('click', '.content-list ol li', function(event) {
        responsiveAction(event, '(max-width: 480px)', function () {
            $('.content-list').css("transform", "translate(-100%, 0px)");
            $('.content-preview').css("transform", "translate(-100%, 0px)");
            $('.toggle').hide();
            $('.button-back-preview').show();
            $('.action-group').show();
            $('.mobile-navbar-title').hide();
        });
    });

    // ### Hide content preview
    $('#manage').on('click', '.button-back-preview', function(event) {
        responsiveAction(event, '(max-width: 480px)', function () {
            $('.content-list').css("transform", "translate(0px, 0px)");
            $('.content-preview').css("transform", "translate(100%, 0px)");
            $('.toggle').show();
            $('.button-back-preview').hide();
            $('.action-group').hide();
            $('.mobile-navbar-title').show();
        });
    });

    $('#manage').on('click', '.settings-menu ul li', function(event) {
        responsiveAction(event, '(max-width: 480px)', function () {
            $('.settings-sidebar').css("transform", "translate(-100%, 0px)");
            $('.settings-content').css("transform", "translate(-100%, 0px)");
            $('.toggle').hide();
            $('.button-back-settings').show();
            $('.mobile-navbar-title').hide();
        });
    });

    $('#manage').on('click', '.button-back-settings', function(event) {
        responsiveAction(event, '(max-width: 480px)', function () {
            $('.settings-sidebar').css("transform", "translate(0px, 0px)");
            $('.settings-content').css("transform", "translate(100%, 0px)");
            $('.toggle').show();
            $('.button-back-settings').hide();
            $('.mobile-navbar-title').show();
        });
    });

    $('#manage').on('click', '.toggle', function(event) {
        responsiveAction(event, '(max-width: 480px)', function () {
            $(".mobile-menu").toggleClass("active");
            $("#main").toggleClass("active");
            $(".toggle").toggleClass("active");
        });
    })

}());
    