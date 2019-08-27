import Component from 'helpers-js/Component';
import { forEach } from 'helpers-js/for-each';

require('jquery-ui/ui/widgets/slider');


export default Component.create('ui-slide', class {
    constructor($block) {
        this.$block = $block;
        this.init();
    }

    init() {

        let uiSliderBlock = document.querySelector('.js-ui-socks-slider');
        let $uiSlider1 = $(uiSliderBlock).find('.ui-slide__slider');
        let $uiSliderInput = $(uiSliderBlock).find('.ui-slide__input');
        let $uiInput1Val = $(uiSliderBlock).find('.ui-slide__input-range').attr('value');
        let $uiInput2Val = $(uiSliderBlock).find('.ui-slide__input-range2').attr('value');
        let uiSliders = document.querySelectorAll('.ui-slide__item-values > .ui-slide__slider');

        $uiSliderInput.each(function (i, e) {
            $uiSliderInput.on('input', () => {
                $uiSlider1.slider('values', i, $(e).val());

                if (e.value > 0) {
                    $(uiSliderBlock).addClass('ui-slide--active');
                } else {
                    $(uiSliderBlock).removeClass('ui-slide--active');
                }
            });
        });

        $uiSlider1.slider({  // двойной range-slider
            range: true,
            min: 0,
            max: 1230,
            values: [$uiInput1Val, $uiInput2Val],
            slide(event, ui) {
                $($uiSliderInput[0]).val(ui.values[0]);
                $($uiSliderInput[1]).val(ui.values[1]);

                if (ui.values[0] || ui.values[1] > 0) {
                    $(uiSliderBlock).addClass('ui-slide--active');
                } else {
                    $(uiSliderBlock).removeClass('ui-slide--active');
                }
            }
        });

        forEach(uiSliders, (e, i) => { // Группа range-slider
            let that = this;

            let $rangeBlock = $(e).closest('.ui-slide__item-values');
            let $rangeInput = $rangeBlock.find('.ui-slide__input');
            let rangeInput = document.querySelectorAll('.ui-slide__input');
            let $maxRange = $rangeBlock.find('.ui-slide__input').attr('data-max-range');

            $rangeInput.on('input', () => {
                $(e).slider('value', $rangeInput.val());
                this.toggleActive(e, rangeInput[i]);
            });

            $(e).slider({
                range: 'min',
                max: $maxRange,

                slide(event, ui) {
                    $rangeInput.val(ui.value);
                    that.toggleActive(e, ui);
                }
            });
        });
    }

    toggleActive(e, input) {
        if (input.value > 0) {
            $(e).addClass('ui-slide--active');
        } else {
            $(e).removeClass('ui-slide--active');
        }
    }
});
