
  const slider = document.querySelector('.slider-wrapper');
  let scrollAmount = 0;
  let scrollStep = 240; // Adjust according to card width + gap
  let maxScroll = slider.scrollWidth - slider.clientWidth;

  function autoScrollSlider() {
    if (scrollAmount >= maxScroll) {
      scrollAmount = 0;
    } else {
      scrollAmount += scrollStep;
    }
    slider.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  setInterval(autoScrollSlider, 3000); // every 3 seconds

