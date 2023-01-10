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

  const mainContent = (param) => {
    const main = getElement('main', []);
    const mainContainer = getElement('div', ['container']);
    const containerAbout = getElement('div', ['container_about']);
    const containerStars = getElement('div', ['animate__animated',  'animate__fadeIn', 'container_ratting']);
    const titleText = getElement('h1', ['animate__animated',  'animate__fadeIn', 'container_title'], {
      textContent: param.title,
    });
    const pCnt = getElement('p', ['animate__animated',  'animate__fadeIn', 'container_text'], {
          textContent: param.main.filmAbout,
    });
    const buttonMain = getElement('a', ['animate__animated',  'animate__fadeIn', 'container_button'], {
      href: param.main.youTubeTrailer,
      textContent: 'Смотреть трейлер',
      target: '_blank',
    });

     if (param.main.ganre) {
      param.main.ganre.map(item => {
        const ganr = getElement('p', ['animate__animated',  'animate__fadeIn', 'genr_container'], {
          textContent: item,
      });

        containerAbout.append(ganr);
      });
    }; 

    if (param.main.ratting) {
      param.main.ratting.map(item => {
        const ratting = getElement('img', [], {
          src: item.img,
        });
        containerStars.append(ratting);

        const rattingNum = getElement('span', ['ratting'], {
          textContent: item.number,
        });
        containerStars.append(rattingNum);
      });
    };
 
    main.append(mainContainer);
    mainContainer.append(containerAbout);
    containerAbout.append(containerStars);
    containerAbout.append(titleText);
    containerAbout.append(pCnt);
    containerAbout.append(buttonMain);
    
    return main;
  };

  const movieConstructor = (selector, option) => {
    const app = document.querySelector(selector);

    document.title = option.title;

    if (option.header) {
      app.append(createHeader(option));
    };

    if (option.backg) {
      document.body.style.background = option.backg;
    };

    if (option.main) {
      app.append(mainContent(option));
    }
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
          img: '/img/twitter.svg',
        },
        {
          title: 'instagram',
          link: '#',
          img: '/img/instagram.svg',
        },
        {
          title: 'facebook',
          link: '#',
          img: '/img/facebook.svg',
        },
      ]
    },
    main: {
      ganre: ['2019, фэнтези'],
      ratting: [{
        number: '7/10',
        img: '/img/rating-stars.svg',
      }],
      filmAbout: ['Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.'],
      youTubeTrailer: 'https://www.youtube.com/watch?v=MlpcwN_6rQs'
    }
  });
