import { Swiper as SwiperNews } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const initSwiperNews = () => {
  new SwiperNews('.news__wrapper-second', {
    loop: false,
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.news__pagination-arrow--next',
      prevEl: '.news__pagination-arrow--prev',
    },
    pagination: {
      el: '.news__pagination-list',
      clickable: true,
      renderBullet: function (index) {
        return `
          <li class="swiper-pagination-bullet ${index === 0 ? 'swiper-pagination-bullet-current' : ''}" rel="tab-${index + 1}">
            <button class="news__pagination-button ${index === 0 ? 'news__pagination-button--current' : ''}" type="button" rel="tab-${index + 1}">
              ${index + 1}
              <span class="visually-hidden">Новость ${index + 1}</span>
            </button>
          </li>
        `;
      },
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
        direction: 'horizontal',
        slidesOffsetAfter: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        direction: 'vertical',
      },
      1440: {
        slidesPerView: 1.16,
        spaceBetween: 75,
        direction: 'horizontal',
        slidesOffsetAfter: 210,
      },
    },
    on: {
      init: function () {
        updateButtonStates(this);
        updateBigSlideClasses(this);
        updatePaginationWindow(this);
      },
      slideChange: function () {
        updateButtonStates(this);
        updateBigSlideClasses(this);
        updatePaginationWindow(this);
      }
    },
  });

  function updateButtonStates(swiperInstance) {
    const prevButton = document.querySelector('.news__pagination-arrow--prev');
    const nextButton = document.querySelector('.news__pagination-arrow--next');

    if (prevButton && nextButton) {
      prevButton.disabled = swiperInstance.isBeginning;
      nextButton.disabled = swiperInstance.isEnd;
      prevButton.setAttribute('aria-disabled', swiperInstance.isBeginning);
      nextButton.setAttribute('aria-disabled', swiperInstance.isEnd);
    }
  }

  function updateBigSlideClasses(swiperInstance) {
    document.querySelectorAll('.news__item-wrapper--big, .news__content--big').forEach((el) => {
      el.classList.remove('news__item-wrapper--big', 'news__content--big');
    });

    const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
    if (activeSlide) {
      const firstWrapper = activeSlide.querySelector('.news__item-wrapper:first-child');
      if (firstWrapper) {
        firstWrapper.classList.add('news__item-wrapper--big');
        const content = firstWrapper.querySelector('.news__content');
        if (content) {
          content.classList.add('news__content--big');
        }
      }
    }
  }

  function updatePaginationWindow(swiper) {
    const paginationList = document.querySelector('.news__pagination-list');
    const totalSlides = swiper.slides.length;
    const activeIndex = swiper.activeIndex;
    let startIdx = 0;
    let endIdx = Math.min(3, totalSlides - 1);

    if (totalSlides > 4) {
      if (activeIndex >= 3) {
        startIdx = Math.min(activeIndex - 2, totalSlides - 4);
        endIdx = startIdx + 3;
      }
      if (activeIndex === totalSlides - 1) {
        startIdx = totalSlides - 4;
        endIdx = totalSlides - 1;
      }
    }

    const bullets = paginationList.querySelectorAll('.swiper-pagination-bullet');
    bullets.forEach((bullet, idx) => {
      bullet.style.display = (idx >= startIdx && idx <= endIdx) ? 'block' : 'none';
      bullet.classList.toggle('swiper-pagination-bullet-current', idx === activeIndex);
      const bulletButton = bullet.querySelector('.news__pagination-button');
      bulletButton?.classList.toggle('news__pagination-button--current', idx === activeIndex)
    })
  }
};

export { initSwiperNews };
