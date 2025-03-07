document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navList.classList.toggle('active');
        const isExpanded = navToggle.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Smooth scrolling and active link
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
});