var slider = slider || (function () {

    var panel;

    function attach(p) {
        panel = p;

        panel.innerHTML =  
            '<div class="flexslider">\
                <ul class="slides">\
                    <li>Slide 2</li>\
                    <li>Slide 1</li>\
                </ul>\
            </div>';

        $(panel).flexslider({
            animation: "slide",
            slideshow: true,
            start: function (slider) {
                $('body').removeClass('loading');
            }
        });
    }

    return {
        attach: attach
    };
})();