// ========================================
// PAGE STATE MANAGEMENT
// ========================================

// Page state management
let pageMode = 'home'; // 'home' | 'projects'

// DOM elements
const projectsView = document.getElementById('projectsView');
const dog = document.getElementById('dog');
const lyingDog = document.getElementById('lyingDog');
const leftPupilLying = document.getElementById('leftPupilLying'); // Lying dog pupils
const rightPupilLying = document.getElementById('rightPupilLying');
const sideOrbit = document.getElementById('sideOrbit');
const card3d = document.getElementById('card3d');
const projectsGrid = document.getElementById('projectsGrid');
const whoBehind = document.getElementById('whoBehind');
const homeButton = document.getElementById('homeButton');

// ========================================
// RESPONSIVE ADAPTATION SYSTEM
// ========================================

// Responsive adaptation for lying dog
function adaptLyingDogSize() {
    if (!lyingDog) return;
    
    const screenWidth = window.innerWidth;
    let scale;
    
    // 使用base尺寸180x210，通过scale实现自适应
    if (screenWidth < 480) {
        // Small screens
        scale = 0.4 * 1.3; // 更小，避免遮挡
    } else if (screenWidth < 768) {
        // Medium screens
        scale = 0.65 * 1.3;
    } else {
        // Large screens
        scale = 1.0 * 1.3;
    }
    
    // Apply scale only, keep base dimensions in CSS
    lyingDog.style.transform = `translateX(0) rotate(-15deg) scale(${scale})`;
    
    console.log(`Lying dog adapted: scale ${scale}`);
}

// Responsive adaptation for 3D cards
function adaptCardsSize() {
    if (!sideOrbit) return;
    
    const screenWidth = window.innerWidth;
    let containerSize, cardSize, cardDistance;
    
    if (screenWidth < 480) {
        // Small screens - 更小的卡片和间距
        containerSize = { width: screenWidth * 0.85, height: (screenWidth * 0.85) * 0.5 };
        cardSize = { width: 50, height: 70 };
        // 减小间距到20%，避免overlap
        cardDistance = containerSize.width * 0.2;
    } else if (screenWidth < 768) {
        // Medium screens
        containerSize = { width: 480, height: 280 };
        cardSize = { width: 100, height: 140 };
        cardDistance = containerSize.width * 0.25;
    } else {
        // Large screens
        containerSize = { width: 600, height: 300 };
        cardSize = { width: 320, height: 200 };
        cardDistance = 250;
    }
    
    // Apply container size
    sideOrbit.style.width = `${containerSize.width}px`;
    sideOrbit.style.height = `${containerSize.height}px`;
    sideOrbit.style.setProperty('--card-distance', `${cardDistance}px`);
    
    // Apply card sizes and font sizes
    const cards = document.querySelectorAll('.card-item');
    cards.forEach(card => {
        card.style.width = `${cardSize.width}px`;
        card.style.height = `${cardSize.height}px`;
        
        // 根据卡片大小调整字体大小
        const cardContent = card.querySelector('.card-content');
        if (cardContent) {
            const h3 = cardContent.querySelector('h3');
            const p = cardContent.querySelector('p');
            
            if (screenWidth < 480) {
                // 小屏幕，更小的字体
                if (h3) h3.style.fontSize = '10px';
                if (p) p.style.fontSize = '8px';
                card.style.padding = '8px';
            } else if (screenWidth < 768) {
                // 中等屏幕
                if (h3) h3.style.fontSize = '14px';
                if (p) p.style.fontSize = '11px';
                card.style.padding = '12px';
            } else {
                // 大屏幕
                if (h3) h3.style.fontSize = '18px';
                if (p) p.style.fontSize = '14px';
                card.style.padding = '20px';
            }
        }
    });
    
    console.log(`Cards adapted: container ${containerSize.width}x${containerSize.height}, cards ${cardSize.width}x${cardSize.height}, distance ${cardDistance}px`);
}

// Responsive adaptation for button
function adaptButtonSize() {
    if (!whoBehind) return;
    
    const screenWidth = window.innerWidth;
    let buttonScale, bottomPosition;
    
    if (screenWidth < 480) {
        buttonScale = 0.8;
        bottomPosition = 60;
    } else if (screenWidth < 768) {
        buttonScale = 0.9;
        bottomPosition = 70;
    } else {
        buttonScale = 1.0;
        bottomPosition = 80;
    }
    
    // Apply position and scale
    whoBehind.style.bottom = `${bottomPosition}px`;
    
    const button = whoBehind.querySelector('.hand-drawn-button');
    if (button) {
        button.style.transform = `scale(${buttonScale})`;
    }
    
    console.log(`Button adapted: scale ${buttonScale}, bottom ${bottomPosition}px`);
}

// Master adaptation function
function adaptAllElements() {
    adaptLyingDogSize();
    adaptCardsSize();
    adaptButtonSize();
}

// Window resize listener
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (pageMode === 'projects') {
            adaptAllElements();
        }
    }, 100);
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// ========================================
// PAGE TRANSITION FUNCTIONS
// ========================================

// Switch to projects mode with animation timeline
function switchToProjectsMode() {
    if (pageMode === 'projects') return;
    
    pageMode = 'projects';
    console.log('Switching to projects mode...');
    
    // Get landing page elements
    const dogCardsContainer = document.getElementById('dogCardsContainer');
    const intro = document.querySelector('.intro');
    const buttonWrapper = document.querySelector('.button-wrapper');
    const landingNav = document.querySelector('.landing-nav');
    
    console.log('Found elements:', {
        dogCardsContainer: !!dogCardsContainer,
        intro: !!intro,
        buttonWrapper: !!buttonWrapper,
        landingNav: !!landingNav
    });
    
    // 0ms: Hide CTA button
    homeButton.style.opacity = '0';
    homeButton.style.pointerEvents = 'none';
    
        // 300ms: Start slide up animation for all cards together maintaining formation
        setTimeout(() => {
            console.log('Starting card slide-up animation...');
            const cards = document.querySelectorAll('.radial-card');
            console.log('Found cards:', cards.length);
            
            if (cards.length === 0) {
                console.error('No cards found!');
                return;
            }
            
            // 先让所有卡片可见
            cards.forEach((card) => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.display = 'block';
            });
            
            // 等待一帧让所有卡片都可见
            requestAnimationFrame(() => {
                // 获取狗的位置作为队形的中心
                const dogRect = dog.getBoundingClientRect();
                const dogCenterX = dogRect.left + dogRect.width / 2;
                const dogCenterY = dogRect.top + dogRect.height / 2;
                
                // 计算队形需要移动到屏幕中心的偏移
                const screenCenterX = window.innerWidth / 2;
                const offsetX = screenCenterX - dogCenterX;
                
                // 所有卡片保持队形一起slide up
                cards.forEach((card) => {
                    const cardRect = card.getBoundingClientRect();
                    
                    // 保持卡片之间的相对位置，但整体移动到屏幕中心
                    card.style.position = 'fixed';
                    card.style.top = cardRect.top + cardRect.height / 2 + 'px';
                    card.style.left = (cardRect.left + cardRect.width / 2 + offsetX) + 'px';
                    card.style.transform = 'translate(-50%, -50%)';
                    card.style.transition = 'none';
                    card.style.zIndex = '1000';
                    card.style.animation = 'none';
                    card.style.filter = 'none';
                    
                    // 等待下一帧再应用slide-up
                    requestAnimationFrame(() => {
                        card.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        card.style.transform = 'translate(-50%, calc(-50% - 150vh))';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 1200);
                    });
                });
            });
        }, 0);
    
    // 300ms后开始狗的slide up
    setTimeout(() => {
        if (dog) {
            console.log('Processing dog:', dog.id);
            
            // 先让狗可见
            dog.style.opacity = '1';
            dog.style.visibility = 'visible';
            dog.style.display = 'block';
            
            // 等待一帧让样式生效
            requestAnimationFrame(() => {
                // 获取狗当前位置
                const rect = dog.getBoundingClientRect();
                
                // 设置到屏幕中心线位置
                dog.style.position = 'fixed';
                dog.style.top = rect.top + rect.height / 2 + 'px';
                dog.style.left = '50%'; // 对齐屏幕中心线
                dog.style.transform = 'translate(-50%, -50%)'; // 保持中心点定位
                dog.style.transition = 'none'; // 先禁用过渡
                dog.style.zIndex = '1000';
                dog.style.animation = 'none';
                dog.style.filter = 'none';
                
                // 等待下一帧再应用slide-up
                requestAnimationFrame(() => {
                    // 重新启用过渡
                    dog.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    dog.style.transform = 'translate(-50%, calc(-50% - 150vh))';
                    
                    setTimeout(() => {
                        dog.style.display = 'none';
                    }, 1200);
                });
            });
        }
    }, 300);
    
    // 600ms后开始文字和按钮的slide up
    setTimeout(() => {
        // 处理intro文字
        if (intro) {
            console.log('Processing intro:', intro);
            
            // 先让文字可见
            intro.style.opacity = '1';
            intro.style.visibility = 'visible';
            intro.style.display = 'block';
            
            // 等待一帧让样式生效
            requestAnimationFrame(() => {
                // 获取文字当前位置
                const rect = intro.getBoundingClientRect();
                const currentTop = rect.top + rect.height / 2;
                
                // 设置到屏幕中心线位置
                intro.style.position = 'fixed';
                intro.style.top = currentTop + 'px';
                intro.style.left = '50%';
                intro.style.right = 'auto';
                intro.style.width = rect.width + 'px'; // 保持原始宽度
                intro.style.transform = 'translate(-50%, -50%)';
                intro.style.transition = 'none';
                intro.style.zIndex = '1000';
                intro.style.animation = 'none';
                intro.style.filter = 'none';
                
                // 等待下一帧再应用slide-up
                requestAnimationFrame(() => {
                    // 重新启用过渡
                    intro.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    intro.style.transform = 'translate(-50%, calc(-50% - 150vh))';
                    
                    setTimeout(() => {
                        intro.style.display = 'none';
                    }, 1200);
                });
            });
        }
        
        // 处理button
        if (buttonWrapper) {
            console.log('Processing buttonWrapper:', buttonWrapper);
            
            // 先让按钮可见
            buttonWrapper.style.opacity = '1';
            buttonWrapper.style.visibility = 'visible';
            buttonWrapper.style.display = 'block';
            
            // 等待一帧让样式生效
            requestAnimationFrame(() => {
                // 获取按钮当前位置
                const rect = buttonWrapper.getBoundingClientRect();
                const currentTop = rect.top + rect.height / 2;
                
                // 设置到屏幕中心线位置
                buttonWrapper.style.position = 'fixed';
                buttonWrapper.style.top = currentTop + 'px';
                buttonWrapper.style.left = '50%';
                buttonWrapper.style.transform = 'translate(-50%, -50%)';
                buttonWrapper.style.transition = 'none';
                buttonWrapper.style.zIndex = '1000';
                buttonWrapper.style.animation = 'none';
                buttonWrapper.style.filter = 'none';
                
                // 等待下一帧再应用slide-up
                requestAnimationFrame(() => {
                    // 重新启用过渡
                    buttonWrapper.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    buttonWrapper.style.transform = 'translate(-50%, calc(-50% - 150vh))';
                    
                    setTimeout(() => {
                        buttonWrapper.style.display = 'none';
                    }, 1200);
                });
            });
        }
        
        // 处理landingNav - 保持sticky，不slide up
        if (landingNav) {
            console.log('Landing nav stays sticky at top - no slide up animation');
        }
    }, 600);
    
    // 1800ms: Wait for landing page elements to fully slide up, then show projects view
    setTimeout(() => {
        projectsView.classList.add('active');
    }, 1800);
    
    // 1200ms: Lying dog slides in from right FIRST (faster)
    setTimeout(() => {
        if (lyingDog) {
            console.log('Adding slide-in class to lying dog');
            lyingDog.classList.add('slide-in');
            
            // Start eye tracking for lying dog
            startLyingDogEyeTracking();
            
            // Apply responsive adaptation after dog appears
            setTimeout(() => {
                adaptLyingDogSize();
            }, 100);
        } else {
            console.log('Lying dog element not found!');
        }
    }, 1200);
    
    // 4000ms: Show 3D card ring and start rotation (after dog slides in and eyes complete sequence)
    setTimeout(() => {
        sideOrbit.classList.add('active');
        card3d.classList.add('run');
        
        // Apply responsive adaptation for cards
        setTimeout(() => {
            adaptCardsSize();
        }, 100);
    }, 4000);
    
    // 4200ms: Show who's behind section (slide up from bottom)
    setTimeout(() => {
        whoBehind.classList.add('active');
        
        // Apply responsive adaptation for button
        setTimeout(() => {
            adaptButtonSize();
        }, 100);
    }, 4200);
}

// Switch back to home mode
function switchToHomeMode() {
    if (pageMode === 'home') return;
    
    pageMode = 'home';
    console.log('Switching to home mode...');
    
    // Get landing page elements
    const dogCardsContainer = document.getElementById('dogCardsContainer');
    const intro = document.querySelector('.intro');
    const buttonWrapper = document.querySelector('.button-wrapper');
    const landingNav = document.querySelector('.landing-nav');
    
    // Hide all projects view elements
    projectsView.classList.remove('active');
    if (lyingDog) lyingDog.classList.remove('slide-in');
    sideOrbit.classList.remove('active');
    card3d.classList.remove('run');
    projectsGrid.classList.remove('active');
    whoBehind.classList.remove('active');
    
    // Dog will be reset with the dog-cards-container
    
    // Reset landing page elements
    if (dogCardsContainer) {
        dogCardsContainer.classList.remove('slide-up');
        dogCardsContainer.style.display = '';
    }
    if (intro) {
        intro.classList.remove('slide-up');
        intro.style.display = '';
    }
    if (buttonWrapper) {
        buttonWrapper.classList.remove('slide-up');
        buttonWrapper.style.display = '';
    }
    if (landingNav) {
        landingNav.classList.remove('slide-up');
        landingNav.style.display = '';
    }
    
    // Show CTA button
    homeButton.style.opacity = '1';
    homeButton.style.pointerEvents = 'auto';
    
    // Reset project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.remove('animate-in');
    });
}

// Animate project cards with stagger
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 60); // 60ms stagger
    });
}

// Start eye tracking for lying dog (global mouse tracking)
function startLyingDogEyeTracking() {
    if (!leftPupilLying || !rightPupilLying || !lyingDog) return;
    
    console.log('Starting lying dog eye tracking (global)');
    
    const onMoveLying = (e) => {
        // Get lying dog position
        const lyingDogRect = lyingDog.getBoundingClientRect();
        const lyingDogCenterX = lyingDogRect.left + lyingDogRect.width / 2;
        const lyingDogCenterY = lyingDogRect.top + lyingDogRect.height / 2;
        
        // Mouse position relative to lying dog center
        const mouseX = e.clientX - lyingDogCenterX;
        const mouseY = e.clientY - lyingDogCenterY;
        
        // Update both lying dog pupils
        [leftPupilLying, rightPupilLying].forEach((pupil) => {
            if (!pupil) return;
            
            const eyeRect = pupil.parentElement.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            
            // Mouse position relative to eye center
            const dx = e.clientX - eyeCenterX;
            const dy = e.clientY - eyeCenterY;
            
            // Calculate angle
            let angle = Math.atan2(dy, dx);
            
            // Limit angle range: -150° to +150°
            const minAngle = (-150 * Math.PI) / 180;
            const maxAngle = (150 * Math.PI) / 180;
            
            if (angle > maxAngle) angle = maxAngle;
            if (angle < minAngle) angle = minAngle;
            
            // Maximum movement radius
            const radius = 7;
            
            const moveX = Math.cos(angle) * radius;
            const moveY = Math.sin(angle) * radius;
            
            pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    };
    
    const onLeaveLying = () => {
        if (leftPupilLying && rightPupilLying) {
            leftPupilLying.style.transform = 'translate(-50%, -50%)';
            rightPupilLying.style.transform = 'translate(-50%, -50%)';
        }
    };
    
    // Add event listeners to the entire window for global tracking
    window.addEventListener('mousemove', onMoveLying);
    window.addEventListener('mouseleave', onLeaveLying);
}

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
    // 初始化自适应
    adaptAllElements();

    // Parallax for particles background layer (lightweight, no interference)
    (function initParticleParallax() {
        let rafId = null;
        const root = document.documentElement;
        
        window.addEventListener('mousemove', (e) => {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(() => {
                const nx = (e.clientX / window.innerWidth) * 2 - 1;  // [-1, 1]
                const ny = (e.clientY / window.innerHeight) * 2 - 1; // [-1, 1]
                root.style.setProperty('--mx', nx.toFixed(3));
                root.style.setProperty('--my', ny.toFixed(3));
                rafId = null;
            });
        });
    })();

    // Particles (hero-only) - non-blocking background, reduced-motion aware
    (function initParticles() {
        const canvas = document.getElementById('particlesCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let rafId = null;
        let particles = [];
        let width = 0, height = 0;
        let reduced = false;

        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateReduced = () => { reduced = mq.matches; };
        updateReduced();
        if (mq.addEventListener) mq.addEventListener('change', updateReduced);
        else if (mq.addListener) mq.addListener(updateReduced);

        function resize() {
            // Always use viewport dimensions for full-screen particles
            width = Math.max(1, Math.floor(window.innerWidth));
            height = Math.max(1, Math.floor(window.innerHeight));
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildParticles();
            if (reduced) drawStatic();
        }

        function getQuantity() {
            const w = window.innerWidth;
            if (w < 480) return 80; // mobile 50–80
            if (w < 768) return 120; // tablet 80–120
            return 160; // desktop 120–160
        }

        function buildParticles() {
            const qty = getQuantity();
            particles = new Array(qty).fill(0).map(() => {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = 1.5 + Math.random() * 0.8; // 1.5–2.3 (larger for better visibility)
                const staticity = 60 + Math.random() * 20; // 60–80
                const ease = 45 + Math.random() * 15; // 45–60
                const vx = (Math.random() * 0.03 + 0.02) * (Math.random() < 0.5 ? -1 : 1);
                const vy = (Math.random() * 0.03 + 0.02) * (Math.random() < 0.5 ? -1 : 1);
                return { x, y, r: size, s: staticity, e: ease, vx, vy };
            });
        }

        function getColor() {
            // Try CSS vars; fallback subtle gray
            const styles = getComputedStyle(document.documentElement);
            const fg = styles.getPropertyValue('--foreground') || styles.getPropertyValue('--color-fg');
            const bg = styles.getPropertyValue('--background') || styles.getPropertyValue('--color-bg');
            // Pick mid-tone depending on body bg lightness heuristic
            const bodyBg = getComputedStyle(document.body).backgroundColor;
            let useLight = true;
            if (bodyBg) {
                // crude luminance check
                const m = bodyBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
                if (m) {
                    const r = +m[1], g = +m[2], b = +m[3];
                    const L = 0.2126*r + 0.7152*g + 0.0722*b;
                    useLight = L < 140;
                }
            }
            // Use light orange for particles with better visibility
            return 'rgba(246, 136, 19, 1.0)'; // light orange fully opaque for clarity
        }

        function clear() {
            ctx.clearRect(0, 0, width, height);
        }

        function drawStatic() {
            clear();
            ctx.globalAlpha = 0.6; // more visible for static mode
            ctx.fillStyle = getColor();
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        canvas.addEventListener('mousemove', onMouseMove);

        function step() {
            clear();
            ctx.globalAlpha = 0.6; // more visible
            ctx.fillStyle = getColor();
            const influenceRadius = 100;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                // gentle drift
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -10) p.x = width + 10; else if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10; else if (p.y > height + 10) p.y = -10;
                
                // mouse influence (subtle attraction/repulsion)
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < influenceRadius && dist > 0) {
                    const force = (influenceRadius - dist) / influenceRadius * 0.15;
                    p.x += (dx / dist) * force;
                    p.y += (dy / dist) * force;
                }
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
            rafId = requestAnimationFrame(step);
        }

        const onVisibility = () => {
            if (document.hidden) {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = null;
            } else if (!reduced) {
                if (!rafId) rafId = requestAnimationFrame(step);
            }
        };

        // init
        resize();
        // Listen to window resize instead of parent element
        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', onVisibility);
        if (!reduced) rafId = requestAnimationFrame(step);
    })();
    
    const loadingScreen = document.getElementById('loading-screen');
    const leftPupil = document.getElementById('leftPupil');
    const rightPupil = document.getElementById('rightPupil');
    const heroWrapper = document.querySelector('.hero-wrapper');
    const heroStage = document.querySelector('.hero-scale');
    const landingNav = document.querySelector('.landing-nav');
    const baseWidth = heroStage ? Number(heroStage.dataset.baseWidth) || heroStage.offsetWidth || 1440 : 1440;
    const baseHeight = heroStage ? Number(heroStage.dataset.baseHeight) || heroStage.offsetHeight || 900 : 900;
    
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
        if (!heroStage) return;

        // Get the dog-cards container
        const dogCardsContainer = document.getElementById('dogCardsContainer');
        if (!dogCardsContainer) {
            console.warn('Dog-cards container not found');
            return;
        }

        // Skip position calculation if elements are in slide-up state
        if (dogCardsContainer.classList.contains('slide-up')) {
            console.log('Skipping position calculation - elements are in slide-up state');
            return;
        }

        // Dog is always at the center of the dog-cards container
        const cx = baseWidth / 2;   // 720px (center of 1440px width)
        const cy = baseHeight / 2;  // 450px (center of 900px height)
        const short = Math.min(baseWidth, baseHeight);

        // Dynamic radius adjustment based on screen size
        const viewportWidth = window.innerWidth;
        const isSmallScreen = viewportWidth < 768;
        const isMobile = viewportWidth < 480;
        const isTinyScreen = viewportWidth < 360;
        
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

        console.log(`Screen: ${viewportWidth}px, Radius multiplier: ${radiusMultiplier}`);

        nodes.forEach(node => {
            const card = document.getElementById(`card-${node.id}`);
            if (!card) {
                console.warn(`Card card-${node.id} not found`);
                return;
            }

            // Polar to Cartesian → card center with dynamic radius
            const adjustedRadius = node.radius * radiusMultiplier;
            const rad = adjustedRadius * short;
            const angleRad = (node.angle * Math.PI) / 180;
            const px = cx + Math.cos(angleRad) * rad;
            const py = cy + Math.sin(angleRad) * rad;

            console.log(`Card ${node.id}: angle=${node.angle}°, radius=${adjustedRadius}, pos=(${px}, ${py})`);

            // Clear only position-related inline styles, keep transform and opacity
            card.style.removeProperty('left');
            card.style.removeProperty('top');
            
            // Force reflow to ensure styles are cleared
            card.offsetHeight;
            
            // Calculate offset from center of dog-cards-container
            const offsetX = px - cx;  // Distance from center
            const offsetY = py - cy;  // Distance from center
            
            // Set CSS custom properties for positioning
            card.style.setProperty('--card-offset-x', `${offsetX}px`);
            card.style.setProperty('--card-offset-y', `${offsetY}px`);
            
            // Use transform to position cards relative to container center
            card.style.setProperty('left', '50%', 'important');
            card.style.setProperty('top', '50%', 'important');
            card.style.setProperty('transform', 'translate(calc(-50% + var(--card-offset-x)), calc(-50% + var(--card-offset-y))) scale(1)', 'important');
            
            // Ensure card is visible
            if (card.style.opacity === '' || card.style.opacity === '0') {
                card.style.opacity = '1';
            }
            
            console.log(`Applied position to ${node.id}: left=${px}px, top=${py}px`);
        });
    };

    const updateHeroScale = () => {
        if (!heroStage || !heroWrapper) return;

        // Skip ALL scaling operations if elements are in slide-up state
        const dogCardsContainer = document.getElementById('dogCardsContainer');
        if (dogCardsContainer && dogCardsContainer.classList.contains('slide-up')) {
            console.log('Skipping ALL hero scale operations - elements are in slide-up state');
            return;
        }

        const navHeight = landingNav ? landingNav.offsetHeight : 0;
        heroWrapper.style.setProperty('--hero-nav-height', `${navHeight}px`);

        const wrapperStyles = window.getComputedStyle(heroWrapper);
        const paddingX = parseFloat(wrapperStyles.paddingLeft) + parseFloat(wrapperStyles.paddingRight);
        const paddingY = parseFloat(wrapperStyles.paddingTop) + parseFloat(wrapperStyles.paddingBottom);

        const availableWidth = Math.max(window.innerWidth - paddingX, 240);
        const availableHeight = Math.max(window.innerHeight - paddingY, 240);
        const scale = Math.min(availableWidth / baseWidth, availableHeight / baseHeight, 1);
        
        // Increase scale for small screens
        const viewportWidth = window.innerWidth;
        const isVerySmallScreen = viewportWidth < 480;
        const isSmallScreen = viewportWidth < 768;
        const isTinyScreen = viewportWidth < 360;
        
        let adjustedScale = scale;
        if (isTinyScreen) {
            adjustedScale = Math.min(scale * 2.2, 1); // 120% larger for tiny screens
        } else if (isVerySmallScreen) {
            adjustedScale = Math.min(scale * 2.0, 1); // 100% larger for very small screens
        } else if (isSmallScreen) {
            adjustedScale = Math.min(scale * 1.6, 1); // 60% larger for small screens
        }

        heroStage.style.width = `${baseWidth}px`;
        heroStage.style.height = `${baseHeight}px`;
        heroStage.style.setProperty('--hero-scale', adjustedScale.toString());

        calculatePositions();
    };

    updateHeroScale();
    window.addEventListener('resize', updateHeroScale);
    window.addEventListener('orientationchange', updateHeroScale);
    if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver(updateHeroScale);
        if (heroWrapper) {
            resizeObserver.observe(heroWrapper);
        }
    }

    // Cards will appear naturally through CSS animations after text completes
    // No need for immediate testing override - let the natural timing work

    // Button to switch to projects mode
    if (homeButton) {
        homeButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior
            switchToProjectsMode();
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

// ========================================
// ACCESSIBILITY & KEYBOARD NAVIGATION
// ========================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // If in projects mode, switch back to home
        if (pageMode === 'projects') {
            switchToHomeMode();
        }
    }
    
    // Space or Enter on home button
    if ((e.key === ' ' || e.key === 'Enter') && e.target === homeButton) {
        e.preventDefault();
        switchToProjectsMode();
    }
});

// Add accessibility attributes
function setupAccessibility() {
    // Add ARIA labels and roles
    if (sideOrbit) {
        sideOrbit.setAttribute('aria-label', 'Interactive projects carousel (hover to pause)');
        sideOrbit.setAttribute('role', 'region');
        sideOrbit.setAttribute('tabindex', '0');
    }
    
    if (card3d) {
        card3d.setAttribute('aria-label', '3D rotating project cards');
    }
    
    if (projectsGrid) {
        projectsGrid.setAttribute('role', 'grid');
        projectsGrid.setAttribute('aria-label', 'Project showcase grid');
    }
    
    if (whoBehind) {
        whoBehind.setAttribute('role', 'region');
        whoBehind.setAttribute('aria-label', 'About the designer');
    }
    
    // Add focus management for 3D card ring
    if (sideOrbit) {
        sideOrbit.addEventListener('focus', () => {
            card3d.classList.remove('run');
        });
        
        sideOrbit.addEventListener('blur', () => {
            if (pageMode === 'projects') {
                card3d.classList.add('run');
            }
        });
    }
}

// Initialize accessibility
setupAccessibility();

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
