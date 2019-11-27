import Swiper from 'swiper';

const mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: '.promotions__button--right',
    prevEl: '.promotions__button--left',
  },
  centeredSlides: true,
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
