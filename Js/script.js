/* ============================
   Cinematic Menu + 3D Hero Carousel
============================ */

gsap.registerPlugin();

document.addEventListener("DOMContentLoaded", () => {
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

  /* ------------------------------
     HERO CAROUSEL 3D ROTATION
  ------------------------------ */
  let xPos = 0;

  gsap.timeline()
    .set('.ring', { rotationY: 180, cursor: 'grab' })
    .set('.img', {
      rotateY: (i) => i * -45,
      transformOrigin: '50% 50% 500px',
      z: -500,
      backfaceVisibility: 'hidden'
    })
    .from('.img', {
      duration: 1.5,
      y: 200,
      opacity: 0,
      stagger: 0.1,
      ease: 'expo'
    })
    .add(() => {
      document.querySelectorAll('.img').forEach(img => {
        img.addEventListener('mouseenter', e => {
          const current = e.currentTarget;
          gsap.to('.img', {
            opacity: (i, t) => (t === current ? 1 : 0.5),
            ease: 'power3'
          });
        });
        img.addEventListener('mouseleave', () => {
          gsap.to('.img', { opacity: 1, ease: 'power2.inOut' });
        });
      });
    }, '-=0.5');

  function normalizeAngle(angle) {
    return (angle % 360 + 360) % 360;
  }

  // Track which image is currently active
  let currentActiveIndex = -1; // Initialize to -1 to detect first update

  function updateActiveImage() {
    const ring = document.querySelector('.ring');
    const images = document.querySelectorAll('.img');
    if (!ring || images.length === 0) return;

    let rotationY = gsap.getProperty(ring, "rotationY");
    rotationY = normalizeAngle(rotationY);

    let closestIndex = 0;
    let closestDiff = 360;
    
    images.forEach((img, i) => {
      let imgAngle = normalizeAngle(i * -45 + rotationY);
      let diff = Math.min(imgAngle, 360 - imgAngle);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIndex = i;
      }
    });

    // Update active class and store current active index
    images.forEach((img, i) => {
      const isActive = i === closestIndex;
      img.classList.toggle('active', isActive);
      
      // Remove any existing label from ALL images
      const existingLabel = img.querySelector('.active-label');
      if (existingLabel) existingLabel.remove();
      
      // Subtle visual feedback for active image
      if (isActive) {
        img.style.filter = 'brightness(1.15)';
        img.style.outline = '2px solid rgba(230, 207, 163, 0.6)';
        img.style.outlineOffset = '-2px';
      } else {
        img.style.filter = 'brightness(0.8)';
        img.style.outline = 'none';
        img.classList.remove('focused');
      }
    });

    currentActiveIndex = closestIndex;
  }

  gsap.ticker.add(updateActiveImage);

  window.addEventListener('mousedown', dragStart);
  window.addEventListener('touchstart', dragStart);
  window.addEventListener('mouseup', dragEnd);
  window.addEventListener('touchend', dragEnd);

  function dragStart(e) {
    if (e.touches) e.clientX = e.touches[0].clientX;
    xPos = Math.round(e.clientX);
    gsap.set('.ring', { cursor: 'grabbing' });
    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag);
  }

  function drag(e) {
    if (e.touches) e.clientX = e.touches[0].clientX;
    gsap.to('.ring', {
      rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
      onUpdate: () => gsap.set('.img', { backgroundPosition: 'center' })
    });
    xPos = Math.round(e.clientX);
  }

  function dragEnd() {
    window.removeEventListener('mousemove', drag);
    window.removeEventListener('touchmove', drag);
    gsap.set('.ring', { cursor: 'grab' });
  }

  /* ------------------------------
    IMAGE ENLARGE EFFECT (FIXED)
  ------------------------------ */
  
  const overlayElement = document.getElementById('overlay');
  let isEnlarged = false;
  let isDragging = false;
  let dragStartTime = 0;

  // OPTION: Set to true to allow clicking ANY image, not just active one
  const ALLOW_ANY_IMAGE_CLICK = true;

  // Track if user is dragging
  window.addEventListener('mousedown', () => {
    isDragging = false;
    dragStartTime = Date.now();
  });

  window.addEventListener('mousemove', () => {
    if (Date.now() - dragStartTime > 100) {
      isDragging = true;
    }
  });

  window.addEventListener('mouseup', () => {
    setTimeout(() => {
      isDragging = false;
    }, 50);
  });

  // Make sure all images are clickable
  document.querySelectorAll('.img').forEach((img, index) => {
    img.style.pointerEvents = 'auto';
    img.style.cursor = 'pointer';
    
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Don't enlarge if user was dragging
      if (isDragging) {
        return;
      }

      // Don't enlarge if already enlarged
      if (isEnlarged) {
        return;
      }

      // Check if this image is the active one
      const isActiveImage = index === currentActiveIndex;
      
      if (!ALLOW_ANY_IMAGE_CLICK && !isActiveImage) {
        return;
      }

      isEnlarged = true;

      // Create enlarged clone
      const clone = img.cloneNode(true);
      clone.classList.add('enlarged');
      clone.classList.remove('active');
      
      // Remove the label from clone
      const cloneLabel = clone.querySelector('.active-label');
      if (cloneLabel) cloneLabel.remove();
      
      // Get the background image from the original
      const bgImage = window.getComputedStyle(img).backgroundImage;
      
      // Apply styles to clone - CRITICAL: Must override everything
      // Using max-width/max-height with object-fit: contain preserves aspect ratio
      clone.style.cssText = `
        position: fixed !important;
        top: 50vh !important;
        left: 50vw !important;
        max-width: 85vw !important;
        max-height: 85vh !important;
        width: auto !important;
        height: auto !important;
        transform: translate(-50%, -50%) !important;
        background-image: ${bgImage} !important;
        background-size: contain !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        z-index: 999999 !important;
        border-radius: 12px !important;
        box-shadow: 0 0 100px rgba(0, 0, 0, 0.95) !important;
        pointer-events: auto !important;
        cursor: pointer !important;
        opacity: 0 !important;
        transition: opacity 0.3s ease !important;
      `;
      
      // Get original image dimensions to set aspect ratio
      // Create a temporary image to get natural dimensions
      const tempImg = new Image();
      const imageUrl = bgImage.match(/url\(["']?(.+?)["']?\)/)?.[1];
      
      if (imageUrl) {
        tempImg.onload = function() {
          const aspectRatio = this.width / this.height;
          const viewportAspect = window.innerWidth / window.innerHeight;
          
          // Calculate dimensions that fit within 85% of viewport while preserving aspect ratio
          let finalWidth, finalHeight;
          
          if (aspectRatio > viewportAspect) {
            // Image is wider than viewport - constrain by width
            finalWidth = Math.min(this.width, window.innerWidth * 0.85);
            finalHeight = finalWidth / aspectRatio;
          } else {
            // Image is taller than viewport - constrain by height
            finalHeight = Math.min(this.height, window.innerHeight * 0.85);
            finalWidth = finalHeight * aspectRatio;
          }
          
          clone.style.width = finalWidth + 'px';
          clone.style.height = finalHeight + 'px';
        };
        tempImg.src = imageUrl;
      } else {
        // Fallback if we can't extract URL
        clone.style.width = '60vw';
        clone.style.height = '80vh';
      }

      // Show overlay with even higher z-index
      if (overlayElement) {
        overlayElement.style.cssText = `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background: rgba(0, 0, 0, 0.9) !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          z-index: 999998 !important;
        `;
      }
      
      document.body.appendChild(clone);

      // Fade in animation
      setTimeout(() => {
        clone.style.opacity = '1';
      }, 10);

      // Close function
      const closeEnlarged = (e) => {
        if (e) e.stopPropagation();
        
        clone.style.opacity = '0';
        
        setTimeout(() => {
          clone.remove();
          if (overlayElement) {
            overlayElement.style.opacity = '0';
            overlayElement.style.visibility = 'hidden';
            overlayElement.style.pointerEvents = 'none';
          }
          isEnlarged = false;
        }, 300);
        
        if (overlayElement) {
          overlayElement.removeEventListener('click', closeEnlarged);
        }
        clone.removeEventListener('click', closeEnlarged);
      };

      // Click overlay or clone to close
      if (overlayElement) {
        overlayElement.addEventListener('click', closeEnlarged);
      }
      clone.addEventListener('click', closeEnlarged);
      
      // Also close on ESC key
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          closeEnlarged();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    });
  });

  function updateZIndex() {
    const images = document.querySelectorAll('.img');
    images.forEach((img, i) => {
      const rotationY = gsap.getProperty('.ring', 'rotationY');
      const angle = ((i * -45 + rotationY) % 360 + 360) % 360;
      const depth = Math.abs(Math.cos((angle * Math.PI) / 180));
      img.style.zIndex = Math.round(depth * 1000);
    });
  }

  gsap.ticker.add(updateZIndex);

  /* ------------------------------
     WORK SECTION CAROUSEL DRAG
  ------------------------------ */
  const workCarousels = document.querySelectorAll('.work-carousel');
  
  workCarousels.forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  });

  /* ------------------------------
     CONTACT CARD MODAL
  ------------------------------ */
  (function(){
    const openBtn = document.querySelector('.open-contact-card');
    const modal   = document.getElementById('contactCard');
    if(!openBtn || !modal) return;

    const panel   = modal.querySelector('.contact-card-panel');
    const closeBtns = modal.querySelectorAll('[data-close], .contact-card-close');
    let lastFocus = null;

    function openModal(){
      lastFocus = document.activeElement;
      modal.setAttribute('aria-hidden','false');
      // prevent background scroll jank while open
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      // focus panel
      requestAnimationFrame(()=> panel.focus());
    }

    function closeModal(){
      modal.setAttribute('aria-hidden','true');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if(lastFocus) lastFocus.focus();
    }

    openBtn.addEventListener('click', openModal);

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    modal.addEventListener('click', (e)=>{
      if(e.target.classList.contains('contact-card-backdrop')) closeModal();
    });

    window.addEventListener('keydown', (e)=>{
      if(modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape'){
        closeModal();
      }
    });
  })();

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
});