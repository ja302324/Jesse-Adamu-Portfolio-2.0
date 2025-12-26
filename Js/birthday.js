const images = Array.from(document.querySelectorAll('#birthdayGrid .card img')).map(img => img.src);
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  document.getElementById('lightboxImage').src = images[index];
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  document.getElementById('lightboxImage').src = images[currentIndex];
}

window.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// Confetti float
const confettiEls = document.querySelectorAll('.confetti');
window.addEventListener('scroll', () => {
  const offset = window.scrollY * 0.2;
  confettiEls.forEach((el, i) => {
    el.style.transform = `translateY(${offset * (i + 1)}px)`;
  });
});
