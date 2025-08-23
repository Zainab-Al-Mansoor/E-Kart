// About Us Swiper
const aboutSwiper = new Swiper(".aboutSwiper", {
  effect: "cube",
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  pagination: {
    el: ".about-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 1000, // 3 seconds
    disableOnInteraction: false, // keep autoplay working after user interaction
  },
  loop: true, // optional: makes slider loop infinitely
});

// Main Homepage Swiper
const mainSwiper = new Swiper(".mainSwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".main-swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 1000, // 3 seconds
    disableOnInteraction: false,
  },
  loop: true, // keeps looping
});



