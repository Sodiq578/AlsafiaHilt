let currentImageIndex = 0;
  const images = document.querySelectorAll('.about-img-wrapper .img-holder img');

  // Function to change images every 3 seconds
  function changeImage() {
    images.forEach(img => img.classList.remove('active'));
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
  }

  setInterval(changeImage, 3000); // Change image every 3 seconds