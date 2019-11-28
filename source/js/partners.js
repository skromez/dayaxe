import Swiper from 'swiper';

const partners = new Swiper('.swiper-partners', {
  slidesPerView: 3,
  spaceBetween: 0,
  slidesPerGroup: 3,
  loop: true,
  allowTouchMove: true,
  navigation: {
    nextEl: '.promotions__button--right',
    prevEl: '.promotions__button--left',
  },
  pagination: {
    el: '.partners-pagination',
    clickable: true,

  },
  breakpoints: {
    768: {
      slidesPerView: 8,
      allowTouchMove: false,
    },
    1339: {
      slidesPerView: 8,
      allowTouchMove: false,
    },
  },
});

export default { partners };
