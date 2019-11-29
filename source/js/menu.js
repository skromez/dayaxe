const button = document.querySelector('.main-nav__button');
const list = document.querySelector('.main-nav__list');
const line = document.querySelectorAll('.main-nav__line');

button.addEventListener('click', () => {
  list.classList.toggle('main-nav__list--menu');
  line.classList.toggle('main-nav__line--cross');
});
/*
1. Взять через querySelector кнопку
2. Через addEventListener подписаться на клик по ней
3. По клику туглить класс у меню, чтобы оно показывалось
4. Опционально можно менять срц у кнопки, а лучше сделать внешний вид кнопки через css
*/
