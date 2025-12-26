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

// FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });

    // Work Card Click Handler
    const workCards = document.querySelectorAll('.work-card');
    
    workCards.forEach(card => {
      card.addEventListener('click', () => {
        const target = card.dataset.href;
        if (target) {
          window.location.href = target;
        }
      });
    });

    // Smooth scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe work cards
    workCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(card);
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
