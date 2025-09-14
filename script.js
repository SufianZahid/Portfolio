// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax Effect for Floating Objects
const floatingObjects = document.querySelectorAll('.floating-object');
const parallaxElements = document.querySelectorAll('.parallax-element');

window.addEventListener('scroll', () => {
    // Throttle scroll for performance
    if (window._scrolling) return;
    window._scrolling = true;
    requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        floatingObjects.forEach((obj, index) => {
            const speed = 0.5 + (index * 0.1);
            obj.style.transform = `translateY(${scrolled * speed}px)`;
        });
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
        window._scrolling = false;
    });
});

// Interactive Cursor Trail
let cursorTrails = [];
let mouseX = 0, mouseY = 0;

for (let i = 0; i < 5; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.width = `${20 - i * 3}px`;
    trail.style.height = `${20 - i * 3}px`;
    trail.style.opacity = `${0.5 - i * 0.1}`;
    document.body.appendChild(trail);
    cursorTrails.push(trail);
}

document.addEventListener('mousemove', (e) => {
    // Throttle mousemove for performance
    if (window._moving) return;
    window._moving = true;
    requestAnimationFrame(() => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        window._moving = false;
    });
});

function animateCursor() {
    let x = mouseX;
    let y = mouseY;
    cursorTrails.forEach((trail, index) => {
        setTimeout(() => {
            trail.style.left = x - trail.offsetWidth / 2 + 'px';
            trail.style.top = y - trail.offsetHeight / 2 + 'px';
        }, index * 10);
    });
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Animate skill bars when in view
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.animation = 'progressBar 2s ease-out';
                }
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Animate skill bars when in view
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
                const progress = entry.target.getAttribute('data-progress');
                progressBar.style.transition = 'width 2s cubic-bezier(0.4,0,0.2,1)';
                progressBar.style.width = progress + '%';
            }
        } else {
            // Reset for repeat animation
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) progressBar.style.width = '0%';
        }
    });
}, { threshold: 0.3 });
skillCards.forEach(card => skillObserver.observe(card));

// Dynamic Navigation Background
let lastScrollTop = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        nav.style.background = 'rgba(var(--bg-glass), 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.boxShadow = '0 5px 20px var(--shadow)';
    } else {
        nav.style.background = 'var(--bg-glass)';
        nav.style.boxShadow = 'none';
    }

    // Hide/show nav on scroll
    if (scrollTop > lastScrollTop && scrollTop > 500) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1000);
});

// 3D Tilt Effect on Project Cards
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Magnetic Buttons
const magneticButtons = document.querySelectorAll('.btn, .contact-link');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Typing Effect for Hero Title
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.textContent;
heroTitle.textContent = '';
let charIndex = 0;

function typeText() {
    if (charIndex < originalText.length) {
        heroTitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
    }
}
setTimeout(typeText, 1500);

// Particle System
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = `linear-gradient(135deg, var(--primary), var(--secondary))`;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = Math.random();
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    document.body.appendChild(particle);

    const duration = Math.random() * 3000 + 2000;
    const horizontalMovement = (Math.random() - 0.5) * 100;

    particle.animate([
        { transform: 'translate(0, 0)', opacity: particle.style.opacity },
        { transform: `translate(${horizontalMovement}px, -${window.innerHeight + 100}px)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}
// Create particles periodically
setInterval(createParticle, 300);

// Easter Egg - Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
function activateEasterEgg() {
    document.body.style.animation = 'glow 2s ease-in-out infinite alternate';
    alert('🎉 Konami Code Activated! You found the easter egg!');
    // Create celebration particles
    for (let i = 0; i < 50; i++) {
        setTimeout(createParticle, i * 20);
    }
}

// Performance Optimization - Throttle scroll events
let scrollTimeout;
let isScrolling = false;
function handleScroll() {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            // Scroll handling logic here
            isScrolling = false;
        });
        isScrolling = true;
    }
}
window.addEventListener('scroll', handleScroll, { passive: true });

// Add ripple effect to buttons
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Add ripple to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

console.log('🚀 Portfolio initialized successfully!');