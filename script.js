/**
 * Portfolio Script
 * Simple, readable JavaScript for portfolio interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. PAGE LOADER
    // ============================================
    const loader = document.querySelector('.page-loader');
    const navbar = document.querySelector('.navbar');
    const heroContent = document.querySelector('.hero-section .container');

    // Hide initially, then fade in
    if (navbar) navbar.style.opacity = '0';
    if (heroContent) heroContent.style.opacity = '0';

    setTimeout(() => loader.classList.add('loaded'), 300);
    setTimeout(() => {
        if (navbar) {
            navbar.style.transition = 'opacity 0.6s ease';
            navbar.style.opacity = '1';
        }
    }, 400);
    setTimeout(() => {
        if (heroContent) {
            heroContent.style.transition = 'opacity 0.8s ease';
            heroContent.style.opacity = '1';
        }
        // Auto-scroll to hero section for clean landing
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'instant' });
        }
    }, 600);

    // ============================================
    // 2. FOOTER YEAR
    // ============================================
    document.getElementById('year').textContent = new Date().getFullYear();

    // ============================================
    // 3. DARK MODE TOGGLE
    // ============================================
    const themeToggle = document.querySelector('.theme-toggle');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ============================================
    // 4. SCROLL ANIMATIONS
    // ============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-title, .project-card, .about-content p').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // 5. SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // 6. NAVBAR SCROLL EFFECT
    // ============================================
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.style.background = 'var(--bg-color)';
            navbar.style.boxShadow = '0 1px 0 var(--border-color)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // ============================================
    // 7. RESUME MODAL
    // ============================================
    const resumeModal = document.getElementById('resumeModal');
    const closeModalBtn = document.getElementById('closeModal');

    // Open modal
    document.querySelectorAll('.resume-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            resumeModal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });

    // Close modal
    function closeResumeModal() {
        resumeModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeResumeModal);
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) closeResumeModal();
    });

    // ============================================
    // 7B. CERTIFICATE MODAL
    // ============================================
    const certModal = document.getElementById('certModal');
    const certEmbed = certModal ? certModal.querySelector('embed') : null;
    const certFullScreen = certModal ? certModal.querySelector('a') : null;
    const closeCertModalBtn = document.getElementById('closeCertModal');

    // Open cert modal
    document.querySelectorAll('.cert-modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const url = trigger.getAttribute('href');
            if (certEmbed) certEmbed.src = url;
            if (certFullScreen) certFullScreen.href = url;
            if (certModal) {
                certModal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });

    // Close cert modal
    function closeCertModal() {
        if (certModal) {
            certModal.classList.remove('active');
            document.body.classList.remove('modal-open');
            // Optional: clear src to stop loading? Not strictly necessary for PDF embed
        }
    }

    if (closeCertModalBtn) closeCertModalBtn.addEventListener('click', closeCertModal);
    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) closeCertModal();
        });
    }

    // ============================================
    // 8. EMAIL POPUP
    // ============================================
    const emailTrigger = document.getElementById('emailTrigger');
    const emailPopup = document.getElementById('emailPopup');
    const copyBtn = document.getElementById('copyBtn');
    const emailText = document.getElementById('emailText');
    const copyFeedback = document.getElementById('copyFeedback');

    if (emailTrigger && emailPopup) {
        // Toggle popup
        emailTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            emailPopup.classList.toggle('active');
        });

        // Copy to clipboard
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(emailText.textContent);
            copyFeedback.classList.add('show');
            setTimeout(() => copyFeedback.classList.remove('show'), 1500);
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!emailTrigger.contains(e.target) && !emailPopup.contains(e.target)) {
                emailPopup.classList.remove('active');
            }
        });
    }

    // ============================================
    // 9. ESCAPE KEY - CLOSE ALL MODALS/POPUPS
    // ============================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            resumeModal.classList.remove('active');
            document.body.classList.remove('modal-open');
            if (emailPopup) emailPopup.classList.remove('active');
        }
    });

    // ============================================
    // 10. TYPING ANIMATION
    // ============================================
    const typingText = document.getElementById('typingText');
    const phrases = ['QA Automation Engineer.', 'SDET.', 'Test Automation Specialist.'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }

        setTimeout(typeEffect, delay);
    }

    if (typingText) {
        setTimeout(typeEffect, 1000); // Start after page load
    }

    // ============================================
    // 11. BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
