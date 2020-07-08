import $ from 'jquery';

export default () => {
    $(() => {
        $('.scrollup').click(() => {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
        })
    })

    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.scrollup').fadeIn();
        }
        else {
            $('.scrollup').fadeOut();
        }
    });

};