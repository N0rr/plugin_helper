// import Swiper from 'swiper';

// var menuButton = document.querySelector('.swiper-menu__menu-button');
// var openMenu = function () {
//   swiper.slidePrev();
// };
// var swiper = new Swiper('.swiper-menu__container', {
//   slidesPerView: 'auto',
//   initialSlide: 1,
//   resistanceRatio: 0,
//   slideToClickedSlide: true,
//   on: {
//     slideChangeTransitionStart: function () {
//       var slider = this;
//       if (slider.activeIndex === 0) {
//         menuButton.classList.add('swiper-menu__cross');
//         // required because of slideToClickedSlide
//         menuButton.removeEventListener('click', openMenu, true);
//       } else {
//         menuButton.classList.remove('swiper-menu__cross');
//       }
//     }
//     , slideChangeTransitionEnd: function () {
//       var slider = this;
//       if (slider.activeIndex === 1) {
//         menuButton.addEventListener('click', openMenu, true);
//       }
//     },
//   }
// });
// console.log(menuButton);
