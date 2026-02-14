document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle (Simple implementation)
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            navUl.style.display = navUl.style.display === 'flex' ? 'none' : 'flex';
            if (navUl.style.display === 'flex') {
                navUl.style.flexDirection = 'column';
                navUl.style.position = 'absolute';
                navUl.style.top = '100%';
                navUl.style.left = '0';
                navUl.style.width = '100%';
                navUl.style.backgroundColor = 'rgba(249, 247, 242, 0.98)';
                navUl.style.padding = '20px';
                navUl.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            console.log('Form Submitted:', data);

            // Visual Feedback
            const button = contactForm.querySelector('button');
            const originalText = button.innerText;
            button.innerText = 'Vielen Dank!';
            button.style.backgroundColor = '#4CAF50';
            button.style.borderColor = '#4CAF50';

            contactForm.reset();

            setTimeout(() => {
                button.innerText = originalText;
                button.style.backgroundColor = '';
                button.style.borderColor = '';
            }, 3000);

            alert(`Danke ${data.name}, Ihre Nachricht wurde (simuliert) versendet!`);
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.text-block, .about-image, .seminar-list, .seminar-images').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);

        // Add class for the CSS transition to work when class is added
        el.classList.add('fade-in-element');
    });

    // Add the CSS for visible state dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
    `;
    document.head.appendChild(styleSheet);
});
