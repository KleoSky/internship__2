import { Swiper as SwiperHero } from 'swiper';
import { Pagination } from 'swiper/modules';

const initSwiperHero = () => {
  const swiper = new SwiperHero('.hero__swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: true,
    modules: [Pagination],
    pagination: {
      el: '.hero__bullets',
      clickable: true,
      bulletClass: 'hero__bullet',
      bulletActiveClass: 'hero__bullet--active',
      renderBullet: (index, className) => `<button class="${className}" type="button" tabindex="-1">
                    <span class="visually-hidden">Слайд ${index + 1}</span>
                </button>`,
    },
    keyboard: { enabled: true, onlyInViewport: false, },
    breakpoints: {
      1440: {
        allowTouchMove: false,
      },
    },
  });

  swiper.on('slideChange', () => {
    const bullets = document.querySelectorAll('.hero__bullet');
    bullets.forEach((bullet) => {
      bullet.classList.remove('hero__bullet--active');
    });
    bullets[swiper.realIndex].classList.add('hero__bullet--active');
  });
};

export { initSwiperHero };
