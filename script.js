// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = 'Toggle Light Mode';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = 'Toggle Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = 'Toggle Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });

    // Optional: Add hover effects or animations (if desired)
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});