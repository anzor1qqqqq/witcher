'use strict'

/*let burgerMenu = () => {
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
  });*/

  const getElement = (tagName, classNames, atributes) => {
    const element = document.createElement(tagName);

    if (classNames) {
      element.classList.add(...classNames)
    };

    if (atributes) {
      for (const atribute in atributes) {
        element[atribute] = atributes[atribute];
      };
    };

    return element;
  };

  const createHeader = (param) => {
    const header = getElement('header', ['header']);
    const containerHeader = getElement('div', ['header_container']);
    const navHeader = getElement('nav', ['header_nav']);
    const navUl = getElement('ul', ['list_button']);
    const contentSocial = getElement('div', ['content_social']);

    if (param.header.logo) {
      const logo = getElement('img', ['logo_img'], {
        src: param.header.logo
      });
      
      containerHeader.append(logo);
    };

    if (param.header.navButton) {
      const arrNavButton = param.header.navButton;
      arrNavButton.forEach((elem) => {
        let ul = `
            <li class="header_nav_button"><a href="#" class="header_nav_button_ur">${elem}</a></li>
        `

        navUl.insertAdjacentHTML('beforeend', ul);
      });
    };

    if (param.header.socialLink) {
        param.header.socialLink.map(item => {
        const social = getElement('a', ['header_social']);
        contentSocial.append(social);

        social.append(getElement('img', [], {
          src: item.img,
        }));
        
        social.href = item.link;
      })
    };

    header.append(containerHeader); 
    containerHeader.append(navHeader);
    navHeader.append(navUl);
    containerHeader.append(contentSocial);

    return header;
  };

  const movieConstructor = (selector, option) => {
    const app = document.querySelector(selector);

    if (option.header) {
      app.append(createHeader(option));
    };

    if (option.backg) {
      document.body.style.background = option.backg;
    };
  };

  movieConstructor('.app', {
    backg: 'url(/img/background.jpg) no-repeat top right 20%, #141218',
    title: 'Ведьмак',
    header: {
      logo: '/img/logo1.svg',
      navButton: ['Описание', 'Трейлер', 'Отзывы'],
      socialLink: [
        {
          title: 'twitter',
          link: '#',
          img: '/img/twitter.svg'
        },
        {
          title: 'instagram',
          link: '#',
          img: '/img/instagram.svg'
        },
        {
          title: 'facebook',
          link: '#',
          img: '/img/facebook.svg'
        },
      ]
    }
  });