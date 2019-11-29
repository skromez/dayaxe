import Swiper from 'swiper';

const promotions = new Swiper('.promotions-swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: '.promotions__button--right',
    prevEl: '.promotions__button--left',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1339: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

export default { promotions };
