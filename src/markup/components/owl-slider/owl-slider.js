import Component from 'helpers-js/Component';
import 'owl.carousel';

export default Component.create('owl-slider', class {
    constructor($block) {
        this.$block = $block;
        this.init();
    }

    init() {
        this.owlSlider = $('#owl-slider');

        window.addEventListener('load', e => {
            this.checkOwl(e);
        });
        window.addEventListener('resize', e => {
            this.checkOwl(e);
        });
    }

    checkOwl() {
        let owlSlider = this.owlSlider;

        if (window.innerWidth > 768) {
            owlSlider.owlCarousel('destroy');
            owlSlider.removeClass('owl-carousel');
        } else {
            owlSlider.addClass('owl-carousel');
            this.initOwl();
        }
        // $('.owl-slider__prev').click(function () {
        //    owlSlider.trigger('next.owl.carousel');
        // });
        // $('.owl-slider__next').click(function () {
        //     owlSlider.trigger('next.owl.carousel');
        // });
    }

    initOwl() {
        this.owlSlider.owlCarousel({
            margin: 0,
            pagination: false,
            pullDrag: true,
            mouseDrag: true,
            dots: true,
            nav: true,
            navText: ['<div class="owl-slider__prev"></div>', '<div class="owl-slider__next"></div>'],
            // navText: ['<',
            //         '>'],
            // navContainer: '#owl-slider__nav',
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                }
            }
        });
    }

});

