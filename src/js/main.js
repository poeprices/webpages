jQuery(function ($) {
    'use strict';
    $('.comp-tab').each(function () {
        var strip = $(this).find('>nav');
        var content = $(this).find('>.tab-content-container');

        strip.find('a').on('click', function (e) {
            e.preventDefault();
            $(this).closest('li').addClass('active').siblings().removeClass('active');
            var target = $(this).attr('href');
            content.find(target).show().siblings().hide();
        }).eq(0).trigger('click');
    });
});
