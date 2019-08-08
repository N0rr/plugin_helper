import Component from 'helpers-js/Component';

export default Component.create('options', class {
    constructor($block) {
        this.$block = $block;
        this.init();
    }
    init() {

        const $filterSortBtn = $('.js-sort-remove');

        $filterSortBtn.click(function () {
            $(this).parent('.options__item').remove();
        });

    }
});

