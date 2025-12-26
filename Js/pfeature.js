/* ------------------------------
     HAMBURGER MENU TOGGLE WITH SCROLL LOCK
  ------------------------------ */
const nav = document.querySelector(".nav");
const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".nav-overlay");

if (hamburger && nav && overlay) {
hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    overlay.classList.toggle("active");
    
    // Toggle scroll lock on body
    document.body.classList.toggle("menu-open");
    
    // Update aria-hidden for accessibility
    const isOpen = overlay.classList.contains('active');
    overlay.setAttribute('aria-hidden', !isOpen);
});

overlay.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
    nav.classList.remove("active");
    overlay.classList.remove("active");
    
    // Remove scroll lock when closing menu
    document.body.classList.remove("menu-open");
    overlay.setAttribute('aria-hidden', 'true');
    });
});

// Close menu when clicking on overlay background
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    overlay.setAttribute('aria-hidden', 'true');
    }
});
}

// Carousel functionality
const carouselPositions = {
proCarousel: 0,
collegeCarousel: 0
};

function moveCarousel(carouselId, direction) {
    const track = document.querySelector(`#${carouselId}`);
    if (!track) return;
    const items = track.querySelectorAll('.carousel-item');
    if (!items.length) return;

    const container = track.parentElement;
    const itemWidth = items[0].offsetWidth;
    const containerWidth = container ? container.offsetWidth : itemWidth * 4;
    const totalWidth = items.length * itemWidth;
    const maxScroll = Math.max(0, totalWidth - containerWidth);

    carouselPositions[carouselId] += direction * itemWidth;

    if (carouselPositions[carouselId] < 0) {
        carouselPositions[carouselId] = 0;
    }
    if (carouselPositions[carouselId] > maxScroll) {
        carouselPositions[carouselId] = maxScroll;
    }

    track.style.transform = `translateX(-${carouselPositions[carouselId]}px)`;
}

// Lightbox functionality
const allImages = [];
let currentImageIndex = 0;

document.querySelectorAll('.grid-item img').forEach(img => {
    allImages.push(img.src);
});

function openLightbox(index) {
    currentImageIndex = index;
    document.getElementById('lightboxImage').src = allImages[index];
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = allImages.length - 1;
    }
    if (currentImageIndex >= allImages.length) {
        currentImageIndex = 0;
    }

    document.getElementById('lightboxImage').src = allImages[currentImageIndex];
}

// Close lightbox on backdrop click
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    }
});

// Responsive carousel adjustment
window.addEventListener('resize', () => {
    carouselPositions.proCarousel = 0;
    carouselPositions.collegeCarousel = 0;
    document.querySelectorAll('.carousel-track').forEach(track => {
        track.style.transform = 'translateX(0)';
});
});
