// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Loading screen control with optimized pupil tracking
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const leftPupil = document.getElementById('leftPupil');
    const rightPupil = document.getElementById('rightPupil');
    
    let eyeX = 0;
    
    // Mouse tracking with angle limit (-120° to +120°)
    const onMove = (e) => {
        const rect = loadingScreen.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Update both pupils
        [leftPupil, rightPupil].forEach((pupil) => {
            if (!pupil) return;
            
            const eyeRect = pupil.parentElement.getBoundingClientRect();
            const centerX = eyeRect.left + eyeRect.width / 2 - rect.left;
            const centerY = eyeRect.top + eyeRect.height / 2 - rect.top;
            
            // Mouse position relative to eye
            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            
            // Calculate angle
            let angle = Math.atan2(dy, dx);
            
            // Limit angle range: expanded to -150° to +150° for better left coverage
            const minAngle = (-150 * Math.PI) / 180;
            const maxAngle = (150 * Math.PI) / 180;
            
            if (angle > maxAngle) angle = maxAngle;
            if (angle < minAngle) angle = minAngle;
            
            // Maximum movement radius - increased for more responsive tracking
            const radius = 7;
            
            const moveX = Math.cos(angle) * radius;
            const moveY = Math.sin(angle) * radius;
            
            pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    };
    
    const onLeave = () => {
        eyeX = 0;
        if (leftPupil && rightPupil) {
            leftPupil.style.transform = 'translate(-50%, -50%)';
            rightPupil.style.transform = 'translate(-50%, -50%)';
        }
    };
    
    // Add event listeners directly to loading screen
    loadingScreen.addEventListener('mousemove', onMove);
    loadingScreen.addEventListener('mouseleave', onLeave);
    
    // Radial Skills Layout (evenly distributed around dog)
    const nodes = [
        { id: 'ux',   angle: -90,  radius: 0.28 },  // Top center (Sniffing Out Problems)
        { id: 'ixd',  angle: 12,   radius: 0.48 },  // Bottom-right
        { id: 'ui',   angle: -28,  radius: 0.45 },  // Top-right (Making It Look Damn Good)
        { id: 'hard', angle: 168,  radius: 0.50 },  // Bottom-left
        { id: 'dev',  angle: 208,  radius: 0.45 },  // Bottom center
    ];

    const calculatePositions = () => {
        if (!loadingScreen) return;
        
        const rect = loadingScreen.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;  // Dog in center of screen
        const short = Math.min(rect.width, rect.height);

        // Dynamic radius adjustment based on screen size
        const isSmallScreen = rect.width < 768;
        const isMobile = rect.width < 480;
        const isTinyScreen = rect.width < 360;
        
        // More aggressive radius reduction for smaller screens
        let radiusMultiplier;
        if (isTinyScreen) {
            radiusMultiplier = 0.5;  // Very tight for tiny screens
        } else if (isMobile) {
            radiusMultiplier = 0.6;  // Tight for mobile
        } else if (isSmallScreen) {
            radiusMultiplier = 0.75; // Moderate for tablet
        } else {
            radiusMultiplier = 1.0;  // Full size for desktop
        }

        nodes.forEach(node => {
            const card = document.getElementById(`card-${node.id}`);
            if (!card) return;

            // Polar to Cartesian → card center with dynamic radius
            const adjustedRadius = node.radius * radiusMultiplier;
            const rad = adjustedRadius * short;
            const angleRad = (node.angle * Math.PI) / 180;
            const px = cx + Math.cos(angleRad) * rad;
            const py = cy + Math.sin(angleRad) * rad;

            // Update card position
            card.style.left = `${px}px`;
            card.style.top = `${py}px`;
        });
    };

    // Calculate on load and resize
    calculatePositions();
    const resizeObserver = new ResizeObserver(calculatePositions);
    resizeObserver.observe(loadingScreen);

    // Button to navigate to home page
    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            loadingScreen.style.display = 'none';
            // Clean up event listeners
            loadingScreen.removeEventListener('mousemove', onMove);
            loadingScreen.removeEventListener('mouseleave', onLeave);
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form validation (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    console.log(`Clicked: ${element} - Action: ${action}`);
    // Add your analytics tracking code here
}

// Add click listeners for tracking
document.querySelectorAll('.cta-button, .contact-link').forEach(element => {
    element.addEventListener('click', function() {
        trackClick(this.textContent, 'click');
    });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

// Observe all images with lazy class
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add loading states
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('loading');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    
    // Add staggered animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Reveal animations
    revealOnScroll();
}, 16);

window.addEventListener('scroll', throttledScrollHandler);
