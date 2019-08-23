import Component from 'helpers-js/Component';
require('jquery-ui/ui/widgets/accordion');

export default Component.create('accordion-pl', class {
    constructor($block) {
        this.$block = $block;
        this.init();
    }

    init() {
        $('.accordion-pl').accordion({
            collapsible: true,
            icons: false,
            heightStyle: 'fill'
        });
    }
});
