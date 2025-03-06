// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling and active link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const navList = document.getElementById('nav-list');
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
            particlesJS('particle-canvas', { particles: { color: { value: '#00ffcc' } } });
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
            particlesJS('particle-canvas', { particles: { color: { value: '#3498db' } } });
        }
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Animation on scroll and active nav link
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.id === 'home') {
                    const fullView = entry.target.querySelector('.full-view');
                    if (fullView) fullView.classList.add('in-view');
                }
                if (entry.target.querySelector('.skills__card')) {
                    entry.target.querySelectorAll('.skill-progress').forEach(progress => {
                        progress.style.width = `${progress.getAttribute('data-value')}%`;
                    });
                }
                // Update active nav link
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === id) {
                        link.classList.add('active');
                    }
                });
            } else {
                if (entry.target.id === 'home') {
                    const fullView = entry.target.querySelector('.full-view');
                    if (fullView) fullView.classList.remove('in-view');
                }
                if (!window.scrollY) {
                    sections.forEach(section => {
                        if (section.id !== 'home') section.style.display = 'none';
                    });
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLinks[0].classList.add('active'); // Default to Home
                }
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold to 0.5 for better section detection

    sections.forEach(section => observer.observe(section));

    // Scroll progress
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;

        if (winScroll > 10) {
            sections.forEach(section => {
                if (section.id !== 'home') section.style.display = 'block';
            });
        } else {
            sections.forEach(section => {
                if (section.id !== 'home') section.style.display = 'none';
            });
        }

        // Dynamic active link based on scroll position
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Digital clock
    const digitalClock = document.getElementById('digital-clock');
    function updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString();
        digitalClock.textContent = time;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Particle background with interaction
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particle-canvas', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
                color: { value: body.classList.contains('dark-mode') ? '#00ffcc' : '#3498db' },
                shape: { type: 'circle' },
                opacity: { value: 0.7, random: true },
                size: { value: 4, random: true },
                line_linked: { enable: true, distance: 150, color: body.classList.contains('dark-mode') ? '#00ffcc' : '#3498db', opacity: 0.5, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, bounce: true }
            },
            interactivity: {
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: { grab: { distance: 200, line_linked: { opacity: 0.8 } }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });

        document.getElementById('particle-canvas').addEventListener('click', () => {
            particlesJS('particle-canvas', { particles: { color: { value: `#${Math.floor(Math.random()*16777215).toString(16)}` } } });
        });
    } else {
        console.warn('Particles.js not loaded');
    }

    // 3D Tilt Effect
    const cards = document.querySelectorAll('.skills__card, .project__card, .certifications__card');
    VanillaTilt.init(cards, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        perspective: 1000
    });

    // Project modal
    const projectCards = document.querySelectorAll('.project__card');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal__close');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            modals.forEach(modal => modal.style.display = 'none');
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Contact form with terminal response
    const contactForm = document.getElementById('contact-form');
    const terminalResponse = document.getElementById('terminal-response');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            if (name && email && message) {
                terminalResponse.textContent = `> Transmitting message to Sai Varma... [SUCCESS]`;
                setTimeout(() => {
                    terminalResponse.textContent = `> Response pending. Check ${email} for updates.`;
                    alert('Message sent to the digital void. Response incoming.');
                    contactForm.reset();
                }, 1000);
            } else {
                terminalResponse.textContent = `> Error: All fields required for transmission.`;
            }
        });
    }

    // Hover effects
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 0 25px rgba(0, 255, 204, 0.6)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 0 15px rgba(0, 255, 204, 0.2)';
        });
    });
});