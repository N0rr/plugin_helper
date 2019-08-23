import Component from 'helpers-js/Component';
require('jquery-ui/ui/widgets/tabs');

export default Component.create('e-tabs', class {
    constructor($block) {
        this.$block = $block;
        this.init();
    }

    init() {
        let tabs1 = document.getElementById('tabs1');

        $(tabs1).tabs();
    }

});

