jQuery(function($){
    'use strict';
    $('.menu a').on('click', function(e){
        e.preventDefault();
        $(this).closest('li').addClass('active').siblings().removeClass('active');
        var target = $($(this).attr('href'));
        target.show().siblings().hide();
    }).eq(0).trigger('click');
});