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

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const hoverElements = document.querySelectorAll('.floating-box');

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

// Mouse Follow Effect on Boxes
const boxes = document.querySelectorAll('.floating-box');

document.addEventListener('mousemove', (e) => {
const mouseX = e.clientX;
const mouseY = e.clientY;

boxes.forEach(box => {
const rect = box.getBoundingClientRect();
const boxCenterX = rect.left + rect.width / 2;
const boxCenterY = rect.top + rect.height / 2;

const deltaX = (mouseX - boxCenterX) * 0.02;
const deltaY = (mouseY - boxCenterY) * 0.02;

// Don't apply if hovering
if (!box.matches(':hover')) {
    box.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}
});
});

// Parallax Effect on Central Title
const title = document.querySelector('.central-title');

document.addEventListener('mousemove', (e) => {
const x = (e.clientX / window.innerWidth - 0.5) * 20;
const y = (e.clientY / window.innerHeight - 0.5) * 20;

title.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
}
});
});

// Magnetic effect on hover
boxes.forEach(box => {
box.addEventListener('mousemove', (e) => {
const rect = box.getBoundingClientRect();
const x = e.clientX - rect.left - rect.width / 2;
const y = e.clientY - rect.top - rect.height / 2;

box.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05) translateY(-10px)`;
});

box.addEventListener('mouseleave', () => {
box.style.transform = '';
});
});