const button = document.querySelector('.main-nav__button');
const list = document.querySelector('.main-nav__list');

button.addEventListener('click', () => {
  list.classList.toggle('main-nav__list--menu');
});
/*
1. Взять через querySelector кнопку
2. Через addEventListener подписаться на клик по ней
3. По клику туглить класс у меню, чтобы оно показывалось
4. Опционально можно менять срц у кнопки, а лучше сделать внешний вид кнопки через css
*/
