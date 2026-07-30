import './style.scss';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', () => {
  
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.header__link');

  const toggleMenu = () => {
    burgerBtn.classList.toggle('header__burger--active');
    mobileMenu.classList.toggle('header__menu--active');
    document.body.classList.toggle('no-scroll'); 
  };

  burgerBtn.addEventListener('click', toggleMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(mobileMenu.classList.contains('header__menu--active')) {
        toggleMenu();
      }
    });
  });

  const scrollBtn = document.getElementById('to-schedule');
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = scrollBtn.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });

  flatpickr('#date-from', {
    dateFormat: 'd.m.Y',
    minDate: 'today',
    locale: { firstDayOfWeek: 1 }
  });

  flatpickr('#date-to', {
    dateFormat: 'd.m.Y',
    minDate: 'today',
    locale: { firstDayOfWeek: 1 }
  });


  const filterForm = document.getElementById('filter-form');
  const cards = document.querySelectorAll('.tour-card');

  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const typeValue = document.getElementById('tour-type').value;

    cards.forEach(card => {
      const cardType = card.getAttribute('data-type');
      if (typeValue === 'all' || cardType === typeValue) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });

  const track = document.getElementById('slider-track');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  let currentIndex = 0;

  const getVisibleSlides = () => window.innerWidth < 768 ? 1 : 2;

  const updateSlider = () => {
  const slideWidth = document.querySelector('.slider__item').getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
};

  nextBtn.addEventListener('click', () => {
    const totalSlides = document.querySelectorAll('.slider__item').length;
    if (currentIndex < totalSlides - getVisibleSlides()) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  window.addEventListener('resize', updateSlider);
});