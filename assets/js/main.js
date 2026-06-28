// DerMech Solution - Shared JavaScript

(function() {
  'use strict';

  // ============================================
  // 1. STICKY NAV SCROLL EFFECT
  // ============================================
  function initStickyNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ============================================
  // 2. LANGUAGE TOGGLE
  // ============================================
  function initLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    const toggleMobile = document.getElementById('langToggleMobile');
    const html = document.documentElement;

    if (!toggle) return;

    // Load saved preference
    const savedLang = localStorage.getItem('dermech-lang') || 'en';
    setLanguage(savedLang);

    toggle.addEventListener('click', function() {
      const currentLang = html.classList.contains('lang-zh') ? 'zh' : (html.classList.contains('lang-de') ? 'de' : 'en');
      const newLang = currentLang === 'en' ? 'de' : (currentLang === 'de' ? 'zh' : 'en');
      setLanguage(newLang);
      localStorage.setItem('dermech-lang', newLang);
    });

    if (toggleMobile) {
      toggleMobile.addEventListener('click', function() {
        const currentLang = html.classList.contains('lang-zh') ? 'zh' : (html.classList.contains('lang-de') ? 'de' : 'en');
        const newLang = currentLang === 'en' ? 'de' : (currentLang === 'de' ? 'zh' : 'en');
        setLanguage(newLang);
        localStorage.setItem('dermech-lang', newLang);
      });
    }

    function setLanguage(lang) {
      html.classList.remove('lang-zh', 'lang-de');
      html.classList.toggle('lang-zh', lang === 'zh');
      html.classList.toggle('lang-de', lang === 'de');

      // Update button text
      const buttonTexts = {
        'en': 'EN | DE | 中',
        'de': 'EN | DE | 中',
        'zh': 'EN | DE | 中'
      };
      toggle.textContent = buttonTexts[lang];

      if (toggleMobile) {
        toggleMobile.textContent = buttonTexts[lang];
      }

      // Swap all trilingual text nodes
      document.querySelectorAll('[data-en][data-de][data-zh]').forEach(el => {
        let text;
        if (lang === 'zh') text = el.dataset.zh;
        else if (lang === 'de') text = el.dataset.de;
        else text = el.dataset.en;
        
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
          if (el.placeholder !== undefined) {
            el.placeholder = text;
          }
        } else if (el.tagName === 'OPTION') {
          el.textContent = text;
        } else {
          el.textContent = text;
        }
      });

      // Update lang attribute for accessibility
      html.setAttribute('lang', lang === 'zh' ? 'zh-Hant' : lang);
    }
  }

  // ============================================
  // 3. ACTIVE NAV LINK
  // ============================================
  function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '/' && href === 'index.html') || (currentPath.endsWith('/') && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ============================================
  // 4. SCROLL REVEAL (IntersectionObserver)
  // ============================================
  function initScrollReveal() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================
  // 5. DYNAMIC NAV HEIGHT
  // ============================================
  function initDynamicNavHeight() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (!nav) return;
    
    function updateNavHeight() {
      const navHeight = nav.offsetHeight;
      document.body.style.paddingTop = navHeight + 'px';
      if (navLinks) {
        navLinks.style.top = navHeight + 'px';
      }
    }
    
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    window.addEventListener('orientationchange', function() {
      setTimeout(updateNavHeight, 100);
    });
  }

  // ============================================
  // 5. MOBILE NAV TOGGLE
  // ============================================
  function initMobileMenu() {
    const hamburger = document.getElementById('navHamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // 6. CONTACT FORM VALIDATION
  // ============================================
  function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(el => el.remove());
      form.querySelectorAll('.form-group').forEach(el => el.classList.remove('has-error'));

      // Validate
      let hasError = false;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          showError(field, field.dataset.en || 'This field is required');
          hasError = true;
        }
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            showError(field, 'Please enter a valid email address');
            hasError = true;
          }
        }
      });

      if (hasError) return;

      // Show success state
      const formHtml = form.innerHTML;
      form.innerHTML = `
        <div class="form-success reveal visible">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1.5rem; color: var(--color-accent);">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <h3 data-en="Message Sent" data-de="Nachricht gesendet" data-zh="訊息已送出">Message Sent</h3>
          <p data-en="Thank you for your inquiry. We will respond within 24 business hours." data-de="Vielen Dank für Ihre Anfrage. Wir werden innerhalb von 24 Geschäftsstunden antworten." data-zh="感謝您的詢問。我們將在24個工作小時內回覆。">Thank you for your inquiry. We will respond within 24 business hours.</p>
        </div>
      `;
      
      // Re-initialize language for new elements
      const savedLang = localStorage.getItem('dermech-lang') || 'en';
      document.documentElement.classList.toggle('lang-zh', savedLang === 'zh');
      document.documentElement.classList.toggle('lang-de', savedLang === 'de');
      form.querySelectorAll('[data-en][data-de][data-zh]').forEach(el => {
        const text = savedLang === 'zh' ? el.dataset.zh : (savedLang === 'de' ? el.dataset.de : el.dataset.en);
        el.textContent = text;
      });
    });

    function showError(field, message) {
      const formGroup = field.closest('.form-group');
      formGroup.classList.add('has-error');
      const errorEl = document.createElement('div');
      errorEl.className = 'form-error';
      errorEl.style.cssText = 'color: #EF4444; font-size: 0.8125rem; margin-top: 0.5rem; font-family: var(--font-mono);';
      errorEl.textContent = message;
      formGroup.appendChild(errorEl);
    }
  }

  // ============================================
  // INIT ALL
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    initStickyNav();
    initLanguageToggle();
    initActiveNav();
    initScrollReveal();
    initDynamicNavHeight();
    initMobileMenu();
    initContactForm();
  });
})();