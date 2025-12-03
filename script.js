document.addEventListener('DOMContentLoaded', () => {
    // Improved Page Loader with staggered content reveal
    const loader = document.querySelector('.page-loader');
    const navbar = document.querySelector('.navbar');
    const heroContent = document.querySelector('.hero-section .container');
    
    // Hide content initially
    if (navbar) navbar.style.opacity = '0';
    if (heroContent) heroContent.style.opacity = '0';
    
    // Show content immediately, don't wait for all resources
    setTimeout(() => {
        loader.classList.add('loaded');
    }, 300);
    
    setTimeout(() => {
        if (navbar) {
            navbar.style.transition = 'opacity 0.6s ease';
            navbar.style.opacity = '1';
        }
    }, 400);
    
    setTimeout(() => {
        if (heroContent) {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.opacity = '1';
        }
    }, 600);

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme (default to light mode)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    // Removed system preference check - always default to light mode

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.section-title, .project-card, .about-content p');
    fadeElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Demo Enlarge Modal
    const enlargeBtn = document.querySelector('.enlarge-btn');
    const demoImg = document.querySelector('.demo-img');
    
    if (enlargeBtn && demoImg) {
        enlargeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const modal = document.createElement('div');
            modal.className = 'demo-modal';
            modal.innerHTML = `
                <div class="demo-modal-content">
                    <button class="demo-close">&times;</button>
                    <img src="${demoImg.src}" alt="QuickKart Demo Enlarged">
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.classList.add('modal-open');
            
            setTimeout(() => modal.classList.add('active'), 10);
            
            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.classList.remove('modal-open');
                }, 300);
            };
            
            modal.querySelector('.demo-close').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
            
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    }

    // Resume Modal Logic
    const modal = document.getElementById('resumeModal');
    const resumeTriggers = document.querySelectorAll('.resume-trigger');
    const closeBtn = document.getElementById('closeModal');

    function openModal(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    resumeTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'var(--bg-color)';
            navbar.style.boxShadow = '0 1px 0 var(--border-color)';
            navbar.style.transition = 'background 0.3s ease, box-shadow 0.3s ease';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });
});
