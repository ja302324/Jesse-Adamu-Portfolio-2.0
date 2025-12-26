document.addEventListener('DOMContentLoaded', () => {
  const eventImages = Array.from(document.querySelectorAll('.event-grid .card img')).map(img => img.src);
  let currentEventIndex = 0;

  window.openLightbox = function(index) {
    currentEventIndex = index;
    document.getElementById('lightboxImage').src = eventImages[index];
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
  };

  window.navigateLightbox = function(direction) {
    currentEventIndex += direction;
    if (currentEventIndex < 0) currentEventIndex = eventImages.length - 1;
    if (currentEventIndex >= eventImages.length) currentEventIndex = 0;
    document.getElementById('lightboxImage').src = eventImages[currentEventIndex];
  };

  window.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Ribbon parallax
  const ribbonEls = document.querySelectorAll('.ribbons');
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.15;
    ribbonEls.forEach((el, i) => {
      el.style.transform = `translateY(${offset * (i + 1)}px)`;
    });
  });
});
