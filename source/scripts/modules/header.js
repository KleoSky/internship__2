const logo = document.querySelector('.header__logo-wrapper');
const navButton = document.querySelector('.nav__button');
const navList = document.querySelector('.nav__list');
const navLinksSelect = document.querySelectorAll('.nav__link--select');
const body = document.querySelector('.body');
const html = document.querySelector('.html');

const menuClose = () => {
  logo.classList.remove('header__logo-wrapper--closed');
  logo.classList.remove('header__logo-wrapper--overlay');
  navButton.classList.remove('nav__button--opened');
  navButton.classList.add('nav__button--closed');
  navList.classList.remove('nav__list--opened');
  navList.classList.add('nav__list--closed');
  body.classList.remove('body-overlay');
  html.classList.remove('html-jswork');

  document.removeEventListener('keydown', handleEscapeKey);
  document.removeEventListener('click', handleOutsideClick);
};

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    menuClose();
  }
}

function handleOutsideClick(event) {
  const isNav = event.target.closest('.nav');
  const isButton = event.target.closest('.nav__button');

  if (!isNav && !isButton && navList.classList.contains('nav__list--opened')) {
    menuClose();
  }
}

// Открытие основного меню
const menuOpen = () => {
  navList.classList.remove('nav__list--opened');
  navList.classList.add('nav__list--closed');

  navButton.addEventListener('click', () => {
    if (navList.classList.contains('nav__list--opened')) {
      menuClose();
    } else {
      logo.classList.add('header__logo-wrapper--closed');
      logo.classList.add('header__logo-wrapper--overlay');
      navButton.classList.remove('nav__button--closed');
      navButton.classList.add('nav__button--opened');
      navList.classList.remove('nav__list--closed');
      navList.classList.add('nav__list--opened');
      body.classList.add('body-overlay');
      html.classList.add('html-jswork');

      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('click', handleOutsideClick);
    }
  });
};

// Функция для открытия/закрытия подменю
const toggleSubMenu = (link) => {
  const sublist = link.nextElementSibling;

  if (sublist.classList.contains('nav__sublist--opened')) {
    link.classList.remove('nav__link--select-opened');
    link.classList.remove('nav__link--active');
    link.classList.add('nav__link--select');
    sublist.classList.remove('nav__sublist--opened');
    sublist.classList.add('nav__sublist--closed');
  } else {
    link.classList.remove('nav__link--select');
    link.classList.add('nav__link--select-opened');
    link.classList.add('nav__link--active');
    sublist.classList.remove('nav__sublist--closed');
    sublist.classList.add('nav__sublist--opened');
  }
};

const subMenuOpen = () => {
  const handleInteraction = (event) => {
    const link = event.currentTarget;

    if (window.innerWidth < 425) {
      if (event.type === 'touchstart') {
        link.touchStartX = event.touches[0].clientX;
        link.touchStartY = event.touches[0].clientY;
      } else if (event.type === 'touchend') {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        const deltaX = Math.abs(touchEndX - link.touchStartX);
        const deltaY = Math.abs(touchEndY - link.touchStartY);

        if (deltaX < 5 && deltaY < 5) {
          toggleSubMenu(link);
        }
      }
    } else {
      toggleSubMenu(link);
    }
  };

  navLinksSelect.forEach((link) => {
    link.addEventListener('click', handleInteraction);
    link.addEventListener('touchstart', handleInteraction, { passive: false });
    link.addEventListener('touchend', handleInteraction, { passive: false });
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth >= 1440) {
      const isClickInside = [...navLinksSelect].some(
        (link) =>
          link.contains(event.target) ||
                    link.nextElementSibling?.contains(event.target)
      );

      if (!isClickInside) {
        navLinksSelect.forEach((link) => {
          const sublist = link.nextElementSibling;
          if (sublist?.classList.contains('nav__sublist--opened')) {
            link.classList.remove('nav__link--select-opened');
            link.classList.add('nav__link--select');
            sublist.classList.remove('nav__sublist--opened');
            sublist.classList.add('nav__sublist--closed');
          }
        });
      }
    }
  });
};

export { menuOpen, subMenuOpen };
