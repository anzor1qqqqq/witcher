'use strict'

let burgerMenu = () => {
  const buttonBurger = document.querySelector('.button_burger');
  const headerContainer = document.querySelector('.header_container');

  buttonBurger.addEventListener('click', () => {
    headerContainer.classList.toggle('active');
    buttonBurger.classList.toggle('active');
  });
};

const swape = () => new Swiper('.swiper', {
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

  const createHeader = ({colorText, header: {logo, navButton, socialLink}}) => {
    const headerBlock = getElement('header', ['header']);
    const containerHeader = getElement('div', ['header_container']);
    const navHeader = getElement('nav', ['header_nav']);
    const navUl = getElement('ul', ['list_button']);
    const contentSocial = getElement('div', ['content_social']);
    const burgerButton = getElement('div', ['button_burger']);

    if (logo) {
      const logoF = getElement('img', ['logo_img'], {
        src: logo,
      });

      containerHeader.append(logoF);
    };

    if (navButton) {
      const arrNavButton = navButton;

      arrNavButton.forEach((elem) => {
        let ul = `
            <li class="header_nav_button"><a href="#" class="header_nav_button_ur" style="color: ${colorText}">${elem}</a></li>
        `

        navUl.insertAdjacentHTML('beforeend', ul);
      }); 
    };

    if (socialLink) {
        socialLink.map(item => {
        const social = getElement('a', ['header_social']);
        contentSocial.append(social);
        social.href = item.link;

        social.append(getElement('img', [], {
          src: item.img,
        }));
      })
    };

    headerBlock.append(containerHeader); 
    containerHeader.append(navHeader);
    navHeader.append(navUl);
    containerHeader.append(contentSocial);
    headerBlock.append(burgerButton);

    return headerBlock;
  };

  const mainContent = (param) => {
    const main = getElement('main', []);
    const mainContainer = getElement('div', ['container']);
    const containerAbout = getElement('div', ['container_about']);
    const containerStars = getElement('div', ['animate__animated',  'animate__fadeIn', 'container_ratting']);
    const titleText = getElement('h1', ['animate__animated',  'animate__fadeIn', 'container_title'], {
      textContent: param.title,
    });
    titleText.style.color = param.colorText;

    const pCnt = getElement('p', ['animate__animated',  'animate__fadeIn', 'container_text'], {
          textContent: param.main.filmAbout,
    });
    pCnt.style.color = param.colorText;

    const buttonMain = getElement('a', ['animate__animated',  'animate__fadeIn', 'container_button'], {
      href: param.main.youTubeTrailer,
      textContent: 'Смотреть трейлер',
      target: '_blank',
    });
    const swiperContainer = getElement('div', ['swiper_container', 'anim_sw', 'animate__animated', 'animate__fadeIn']);
    const cardSwiper = getElement('div', ['card', 'swiper']);
    const swiperWrapper = getElement('div', ['swiper-wrapper']);
    const buttonSwiper = getElement('button', ['seria_button_switch']);

     if (param.main.ganre) {
      param.main.ganre.map(item => {
        const ganr = getElement('p', ['animate__animated',  'animate__fadeIn', 'genr_container'], {
          textContent: item,
      });

        ganr.style.color = param.colorText; 
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

        rattingNum.style.color = param.colorText;
        containerStars.append(rattingNum);
      });
    };

     param.main.slider.forEach(({img, title, textAbout}) => {
      let card = `
      <div class="card_seria swiper-slide" style="background: ${img}">
                    <div class="seria_text_container">
                    <span class="text_card_title" style="color: ${param.colorText}">${title}<br></span>
                    <span class="text_card_text" style="color: ${param.colorText}">${textAbout}</span>
                    </div>
      </div>
      `;

      swiperWrapper.insertAdjacentHTML('beforeend', card);
    });
  
    main.append(mainContainer);
    mainContainer.append(containerAbout);
    containerAbout.append(containerStars);
    containerAbout.append(titleText);
    containerAbout.append(pCnt);
    containerAbout.append(buttonMain);
    main.append(swiperContainer);
    swiperContainer.append(cardSwiper);
    cardSwiper.append(swiperWrapper);
    swiperContainer.append(buttonSwiper);
    
    return main;
  };

  const createFooter = ({backgColor, footer: {reserved, link_policy}}) => {
    const footerContent = getElement('footer', ['footer_content']);
    footerContent.style.backgroundColor = backgColor;
    const footerContentBlock = getElement('div', ['footer_content_block']);
    const reservedF = getElement('div', ['reserved']);
    const textReserved = getElement('p', ['text_reserved'], {
      textContent: reserved,
    })
    const policyBlock = getElement('div', ['policy']);
    const navMenu = getElement('nav', []);

    if (link_policy) {
      link_policy.forEach((elem) => {
        const stringPolicy = `
          <a href="#" class="link_policy">${elem}</a>
          `

        navMenu.insertAdjacentHTML('beforeend', stringPolicy);
      });
    };

    footerContent.append(footerContentBlock);
    footerContentBlock.append(reservedF);
    reservedF.append(textReserved);
    footerContentBlock.append(policyBlock);
    policyBlock.append(navMenu);

    return footerContent;
  };

  const movieConstructor = (selector, option) => {
    const app = document.querySelector(selector);
    const linkImg = getElement('link', [], {
      rel: 'icon',
      href: option.favicon,
    });

    document.title = option.title;
    document.head.append(linkImg);

    if (option.header) {
      app.append(createHeader(option));
      burgerMenu();
    };

    if (option.backg) {
      document.body.style.background = option.backg;
    };

    if (option.main) {
      app.append(mainContent(option));
      swape();
    };

    if (option.footer) {
      app.append(createFooter(option));
    };
  };

  movieConstructor('.app', {
    backg: 'url(/loki/background.jpg) no-repeat top right 25%, #000000',
    backgColor: '#000000',
    title: 'Локи',
    favicon: '/loki/favicon.png', 
    colorText: '#FFFFFF',
    header: {
      logo: '/loki/logo.png',
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
      ganre: ['2021, фантастика, фэнтези, боевик, приключения'],
      ratting: [{
        number: '7/10',
        img: '/img/rating-stars.svg',
      }],
      filmAbout: ['Локи попадает в таинственную организацию «Управление временными изменениями» после того, как он украл Тессеракт, и путешествует во времени, меняя историю.'],
      youTubeTrailer: 'https://youtu.be/YrjHcYqe31g',
      slider: [
        {
          img: 'linear-gradient(180deg, rgba(20, 18, 24, 0.5) 0%, #2D2D2D 100%), url(loki/series/series-1.jpg) no-repeat center / cover;',
          title: 'Серия #1',
          textAbout: 'Славная миссия',
        },
        {
          img: 'linear-gradient(180deg, rgba(20, 18, 24, 0.5) 0%, #2D2D2D 100%), url(loki/series/series-2.jpg) no-repeat center / cover;',
          title: 'Серия #2',
          textAbout: 'Вариант',
        },
        {
          img: 'linear-gradient(180deg, rgba(20, 18, 24, 0.5) 0%, #2D2D2D 100%), url(loki/series/series-3.jpg) no-repeat center / cover;',
          title: 'Серия #3',
          textAbout: 'Ламентис',
        },
        {
          img: 'linear-gradient(180deg, rgba(20, 18, 24, 0.5) 0%, #2D2D2D 100%), url(loki/series/series-4.jpg) no-repeat center / cover;',
          title: 'Серия #4',
          textAbout: 'Смежное событие',
        },
        {
          img: 'linear-gradient(180deg, rgba(20, 18, 24, 0.5) 0%, #2D2D2D 100%), url(loki/series/series-5.jpg) no-repeat center / cover;',
          title: 'Серия #5',
          textAbout: 'Путешествие в неизвестность',
        },
        {
          img: 'linear-gradient(180deg, rgba(20, 18, 24, 0.5) 0%, #2D2D2D 100%), url(loki/series/series-6.jpg) no-repeat center / cover;',
          title: 'Серия #6',
          textAbout: 'На все времена. Всегда',
        }
      ]
    },
    footer: {
      reserved: '© 2020 The Witcher. All right reserved.',
      link_policy: ['Privacy Policy', 'Terms of Service', 'Legal'],
    }
  });