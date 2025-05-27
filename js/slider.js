const cards = document.querySelectorAll('.card');
let currentIndex = 2; // Começa com o slide do meio

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove('active', 'left', 'right');

    if (i === currentIndex) {
      card.classList.add('active');
    } else if (i === currentIndex - 1) {
      card.classList.add('left');
    } else if (i === currentIndex + 1) {
      card.classList.add('right');
    }
  });
}

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
});

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
});

updateCarousel();
