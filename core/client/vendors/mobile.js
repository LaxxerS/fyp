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
            $('.content-list').animate({right: '100%', left: '-100%', 'margin-right': '15px'}, 300);
            $('.content-preview').animate({right: '0', left: '0', 'margin-left': '0'}, 300);
            $('.toggle').hide();
            $('.button-back').show();
            $('.action-group').show();
        });
    });

    // ### Hide content preview
    $('#manage').on('click', '.content-preview .button-back', function(event) {
        responsiveAction(event, '(max-width: 480px)', function () {
            $('.content-list').animate({right: '0', left: '0', 'margin-right': '0'}, 300);
            $('.content-preview').animate({right: '-100%', left: '100%', 'margin-left': '15px'}, 300);
            $('.toggle').show();
            $('.button-back').hide();
            $('.action-group').hide();
        });
    });

    $('#manage').on('click', '.settings-menu ul li', function(event) {
        responsiveAction(event, '(max-width: 480px)', function () {
            $('.settings-sidebar').animate({right: '100%', left: '-100%', 'margin-right': '15px'}, 300);
            $('.settings-content').animate({right: '0', left: '0', 'margin-left': '0'}, 300);
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
    