import Component from 'helpers-js/Component';
import 'owl.carousel';

export default Component.create('helper-item', class {
    constructor($block) {
        this.$block = $block;
        this.init();
    }

    init() {
        this.helperSlider = document.querySelectorAll('#helper-slider-js');

        this.checkOwl();

        window.addEventListener('resize', e => {
            this.checkOwl();
        });
    }

    checkOwl() {
        let owl = this.helperSlider;

        $(owl).each(function () {
            let $this = $(this);

            if (window.innerWidth > 768) {
                $this.owlCarousel('destroy');
                $this.removeClass('owl-carousel');
            } else {
                $this.addClass('owl-carousel');
                $this.owlCarousel({
                    margin: 0,
                    pagination: false,
                    pullDrag: false,
                    mouseDrag: false,
                    autoHeight: true,
                    dots: true,
                    navContainer: '#owl-slider__nav',
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
    }
});
