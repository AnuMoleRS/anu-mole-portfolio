// Preloader dismissal on window load
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Dark & Light Theme Management
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Detect system preference or saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
        });
    }

    /* ==========================================================================
       2. Mobile Drawer Navigation
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('open');
        if (drawerBackdrop) drawerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (drawerBackdrop) drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* ==========================================================================
       3. Typing Effect Animation
       ========================================================================== */
    const words = [
        "Python Django Developer",
        "Enterprise ERP Specialist",
        "Backend Architecture Expert",
        "Java Full Stack Developer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');

    function typeEffect() {
        if (!typingElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2200; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    /* ==========================================================================
       4. Scroll Reveal Animations & Active Bottom Nav Tracking
       ========================================================================== */
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollObserver.observe(el);
    });

    // Update active state on mobile bottom navigation
    const sections = document.querySelectorAll('header, section');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       5. Smooth Scrolling for Links
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       6. 3D Card Hover Tilt Effect
       ========================================================================== */
    const tiltCards = document.querySelectorAll('.project-card, .skill-card, .cert-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // Disable on touch mobile
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    /* ==========================================================================
       7. Contact Form Handler (Direct Delivery to anumolers@gmail.com)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatusMsg = document.getElementById('form-status-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = document.getElementById('contact-email');
            const messageInput = document.getElementById('contact-message');
            const senderEmail = emailInput ? emailInput.value.trim() : '';
            const messageText = messageInput ? messageInput.value.trim() : '';

            if (!senderEmail || !messageText) return;

            // Display inline success notification
            if (formStatusMsg) {
                formStatusMsg.className = 'form-status-box success';
                formStatusMsg.style.display = 'flex';
                formStatusMsg.innerHTML = '<i class="fas fa-check-circle"></i> Opening email client to send message to anumolers@gmail.com...';
            }

            // Construct mailto link
            const mailtoUrl = `mailto:anumolers@gmail.com?subject=${encodeURIComponent('Portfolio Message from ' + senderEmail)}&body=${encodeURIComponent(messageText + '\n\n---\nFrom: ' + senderEmail)}`;

            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 500);

            // Clean up status message and reset form
            setTimeout(() => {
                contactForm.reset();
                if (formStatusMsg) {
                    formStatusMsg.innerHTML = '<i class="fas fa-check-circle"></i> Direct delivery message ready for anumolers@gmail.com.';
                }
            }, 3000);
        });
    }
});

