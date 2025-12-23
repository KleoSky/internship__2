import { Swiper as SwiperPrograms } from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

const initSwiperPrograms = () => {
  new SwiperPrograms('.programs__swiper', {
    loop: false,
    modules: [Navigation, Scrollbar],
    navigation: {
      nextEl: '.programs__button--next',
      prevEl: '.programs__button--prev',
    },
    scrollbar: {
      el: '.programs__scrollbar',
      draggable: true,
      hide: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        allowTouchMove: true,
        slidesOffsetAfter: 1,
      },
      768: {
        slidesPerView: 2.13,
        spaceBetween: 30,
        allowTouchMove: true,
        slidesOffsetAfter: 45,
        scrollbar: {
          snapOnRelease: true,
          dragSize: 326,
        }
      },
      1440: {
        slidesPerView: 3,
        allowTouchMove: false,
        slidesOffsetAfter: 2,
        scrollbar: {
          snapOnRelease: true,
          dragSize: 394,
        }
      },
    },
    on: {
      init: function () {
        updateButtonStates(this);
        updateScrollbar(this);
      },
      slideChange: function () {
        updateButtonStates(this);
        updateScrollbar(this);
      },
    },
  });

  function updateButtonStates(swiperInstance) {
    const prevButton = document.querySelector('.programs__button--prev');
    const nextButton = document.querySelector('.programs__button--next');

    prevButton.disabled = false;
    nextButton.disabled = false;

    if (swiperInstance.isBeginning) {
      prevButton.disabled = true;
      prevButton.setAttribute('aria-disabled', 'true');
    } else {
      prevButton.disabled = false;
      prevButton.setAttribute('aria-disabled', 'false');
    }

    if (swiperInstance.isEnd) {
      nextButton.disabled = true;
      nextButton.setAttribute('aria-disabled', 'true');
    } else {
      nextButton.disabled = false;
      nextButton.setAttribute('aria-disabled', 'false');
    }
  }

  function updateScrollbar (swiperInstance) {
    const scrollbar = swiperInstance.scrollbar;
    if (scrollbar && scrollbar.drag) {
      const progress = swiperInstance.progress;
      scrollbar.drag.style.transform = `translate3d(${progress * 100}%, 0, 0)`;
    }
  }
};

export { initSwiperPrograms };
