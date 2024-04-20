/* 
* Initialize slick JS AFTER the ajax request so it can find the dynamic elements generated.
* */ 
function slickInitialize(element_id, slidesToShow) {
    jQuery.when(ajaxDeferred).done(function () {
        // Initialize the Slick slider after populating the slides
        $(element_id).slick({
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: slidesToShow,
            slidesToScroll: 2,
            speed: 300,
            autoplay: true,
            useCSS:true,
            autoplaySpeed: 2000,
              infinite: false,
            initialSlide: 3,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '0px',
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '0px',
                        slidesToShow: 1
                    }
                },
            ],
            prevArrow: '<div class="slick-prev"><span class="fa fa-angle-left" aria-hidden="true"></span></div>',
            nextArrow: '<div class="slick-next"><span class="fa fa-angle-right" aria-hidden="true"></span></div>',
        });
    });
};
