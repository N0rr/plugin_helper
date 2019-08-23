'use strict';

import polyfills from './libraries/polyfills';
import Component from 'helpers-js/Component';

import 'components/helper-item/helper-item';
import 'components/scrollto/scrollto';
import 'components/slide-menu/slide-menu';
import 'components/e-owl-carousel/e-owl-carousel';
import 'components/ui-slide/ui-slide';
import 'components/select/select';
import 'components/input/input';
import 'components/popup/popup';
import 'components/accordion-pl/accordion-pl';
import 'components/e-scroll/e-scroll';
import 'components/e-tabs/e-tabs';

$(() => {
    polyfills.init();
    Component.initAll();
    // ================ Здесь инициализируем модули =====================
});
