import Component from 'helpers-js/Component';
import { animateScroll } from 'helpers-js/animations';

export default Component.create('scrollto', class {
    constructor($block) {
        this.$block = $block;
        this.init();
    }

    init() {
        const scrollLinks = document.querySelector('.scroll-to-container-js');

        scrollLinks.addEventListener('click', e => {
            this.goToBlock(e);
        });

    }

    goToBlock(e) {
        e.preventDefault();
        this.scrollLink = e.target;

        if (this.scrollLink.classList.contains('scroll-link-js')) {
            this.scrolledBlockClass = this.scrollLink.getAttribute('data-link');

            this.scrolledBlock = document.querySelector('.' + this.scrolledBlockClass);
            animateScroll({
                element: this.scrolledBlock
            });
        }
    }
});
