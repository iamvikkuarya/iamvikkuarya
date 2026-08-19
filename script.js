/*
 * Open Design — client-side behavior for the Atelier Zero landing page.
 *
 * 1. Scroll-reveal observer — watches every [data-reveal] element and
 *    flips data-revealed='true' once it enters the viewport, triggering
 *    the CSS transition.
 *
 * 2. Headroom-style sticky header — hides the nav on downward scroll,
 *    re-pins it on upward scroll, and always keeps it visible near the
 *    top of the page.
 *
 * Mirrors the behavior from apps/landing-page/app/_components/.
 */

(function () {
  'use strict';

  // ============================================
  // DOM REFERENCES
  // ============================================
  var nav = document.getElementById('nav');
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelectorAll('.nav-links a, .nav-cta');
  var html = document.documentElement;
  var yearEl = document.getElementById('year');

  // ============================================
  // MOBILE NAV TOGGLER
  // ============================================
  function toggleNav() {
    var willOpen = hamburger.getAttribute('aria-expanded') !== 'true';
    hamburger.setAttribute('aria-expanded', String(willOpen));
    hamburger.classList.toggle('active', willOpen);
    nav.classList.toggle('nav-mobile-open', willOpen);
    html.classList.toggle('nav-open', willOpen);
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', toggleNav);
  });

  html.addEventListener('click', function (e) {
    if (nav.classList.contains('nav-mobile-open') && !e.target.closest('header')) {
      toggleNav();
    }
  });

  // ============================================
  // 1. SCROLL-REVEAL OBSERVER
  // ============================================
  var elements = document.querySelectorAll('[data-reveal]:not([data-revealed])');
  if (elements.length) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(function (el) { el.dataset.revealed = 'true'; });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.dataset.revealed = 'true';
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -15% 0px' });

      elements.forEach(function (el) { observer.observe(el); });
    }
  }

  // ============================================
  // 2. HEADROOM STICKY HEADER
  // ============================================
  if (nav) {
    var SHOW_TOP = 100;
    var DELTA = 6;
    var lastY = window.scrollY;

    function onScroll() {
      var y = window.scrollY;
      var d = y - lastY;
      if (y <= SHOW_TOP) {
        nav.classList.remove('is-hidden');
      } else if (d > DELTA) {
        nav.classList.add('is-hidden');
      } else if (d < -DELTA) {
        nav.classList.remove('is-hidden');
      }
      lastY = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ============================================
  // 3. FOOTER YEAR
  // ============================================
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
