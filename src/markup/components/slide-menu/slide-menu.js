import Component from 'helpers-js/Component';

export default Component.create('slide-menu', class {
    constructor($block) {
        this.$block = $block;
        this.init();
    }

    init() {
        let menuBlock = document.querySelector('.js-menu');
        let menuBtn = document.querySelector('.js-menu-btn');

        $(menuBtn).click(function () {
            $(menuBlock).toggleClass('js-menu-open');
        });

    }
});

