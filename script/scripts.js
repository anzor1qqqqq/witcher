'use strict'

let burgerMenu = () => {
  const buttonBurger = document.querySelector('.button_burger');
  const headerContainer = document.querySelector('.header_container');

  buttonBurger.addEventListener('click', () => {
    headerContainer.classList.toggle('active');
    buttonBurger.classList.toggle('active');
  });
};

burgerMenu();

new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    
    navigation: {
    nextEl: '.seria_button_switch',
    },

    breakpoints: {
      570: {
        slidesPerView: 2,
      }
    }
  });
