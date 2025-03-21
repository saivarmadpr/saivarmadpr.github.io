document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animation for Home Section
    gsap.fromTo(
        '.home__content',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
    );
    gsap.fromTo(
        '.home__title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.3 }
    );
    gsap.fromTo(
        '.home__subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.5 }
    );
    gsap.fromTo(
        '.home__description',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.7 }
    );
    gsap.fromTo(
        '.home__cta',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.9 }
    );

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navList.classList.toggle('active');
        const isExpanded = navToggle.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Smooth scrolling for nav brand (scroll to top)
    const navBrand = document.querySelector('.nav__brand');
    navBrand.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scrolling and active link for navigation
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            if (window.innerWidth <= 768) {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Animation on scroll and active section highlighting
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === id) {
                        link.classList.add('active');
                    }
                });

                // Animate child cards
                const cards = entry.target.querySelectorAll('.skills__card, .certifications__card, .project__card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('in-view');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Project modal
    const projectCards = document.querySelectorAll('.project__card');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal__close');

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            modal.querySelector('.modal__content').focus();
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            });
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Keyboard accessibility for modals
    modals.forEach(modal => {
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.querySelector('.form-message');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill out all fields.';
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            return;
        }

        formMessage.textContent = 'Message sent successfully! (Demo mode)';
        formMessage.classList.add('success');
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.classList.remove('success');
            contactForm.reset();
        }, 3000);
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');

    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Sync with system preference
    prefersDark.addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.remove('light-mode');
            themeToggle.checked = false;
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            themeToggle.checked = true;
            localStorage.setItem('theme', 'light');
        }
    });

    // Matrix background effect
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dynamic color based on theme
        const isLightMode = document.body.classList.contains('light-mode');
        ctx.fillStyle = isLightMode ? '#333333' : '#00ffcc'; // Dark gray in light mode, cyan in dark mode
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    });
});