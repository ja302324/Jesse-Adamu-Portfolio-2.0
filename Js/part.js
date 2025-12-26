// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const hoverElements = document.querySelectorAll('.portrait-item, .back-button, .lightbox-close, .lightbox-nav');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    });
});

// Parallax effect on portraits
const portraits = document.querySelectorAll('.portrait-item');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    portraits.forEach((portrait, index) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;
    
    if (!portrait.matches(':hover')) {
        portrait.style.transform = `translate(${x}px, ${y}px)`;
    }
    });
});

// Lightbox functionality
const allImages = [];
let currentImageIndex = 0;

document.querySelectorAll('.portrait-item img').forEach(img => {
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

// Magnetic effect on hover
portraits.forEach(portrait => {
    portrait.addEventListener('mousemove', (e) => {
    const rect = portrait.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
    
    portrait.style.transform = `translate(${x}px, ${y}px) scale(1.02) translateY(-8px)`;
    });
    
    portrait.addEventListener('mouseleave', () => {
    portrait.style.transform = '';
    });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
    }
    });
}, { threshold: 0.1 });

portraits.forEach(portrait => {
    portrait.style.opacity = '0';
    portrait.style.transform = 'translateY(30px)';
    portrait.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(portrait);
});