// ========================================
// PAGE STATE MANAGEMENT
// ========================================

// Page state management
let pageMode = 'home'; // 'home' | 'projects' | 'about'

// DOM elements
const projectsView = document.getElementById('projectsView');
const aboutMeView = document.getElementById('aboutMeView');
const dog = document.getElementById('dog');
const lyingDog = document.getElementById('lyingDog');
const leftPupilLying = document.getElementById('leftPupilLying'); // Lying dog pupils
const rightPupilLying = document.getElementById('rightPupilLying');
const sideOrbit = document.getElementById('sideOrbit');
const card3d = document.getElementById('card3d');
const projectsGrid = document.getElementById('projectsGrid');
const whoBehind = document.getElementById('whoBehind');
const whoBehindButton = document.getElementById('whoBehindButton');
const backToProjectsButton = document.getElementById('backToProjectsButton');
const homeButton = document.getElementById('homeButton');

// ========================================
// RESPONSIVE ADAPTATION SYSTEM
// ========================================

// Responsive adaptation for lying dog
function adaptLyingDogSize() {
    if (!lyingDog) return;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let scale, bottomPos, rightPos;
    
    // 使用base尺寸180x210，通过scale实现自适应
    // 始终保持在右下角
    if (screenWidth < 360) {
        scale = 0.3; // 超小屏
        bottomPos = '15px';
        rightPos = '8px';
    } else if (screenWidth < 480) {
        scale = 0.4; // 小屏
        bottomPos = '20px';
        rightPos = '10px';
    } else if (screenWidth < 768) {
        scale = screenHeight < 700 ? 0.55 : 0.6; // 中屏，高度矮时更小
        bottomPos = screenHeight < 700 ? '25px' : '35px';
        rightPos = screenHeight < 700 ? '12px' : '18px';
    } else if (screenHeight < 600) {
        scale = 0.65; // 高度矮的时候缩小
        bottomPos = '30px';
        rightPos = '20px';
    } else if (screenHeight < 700) {
        scale = 0.75; // 稍微矮的时候
        bottomPos = '35px';
        rightPos = '25px';
    } else if (screenHeight < 900) {
        scale = 1.2; // 正常大屏，稍微放大
        bottomPos = '50px';
        rightPos = '30px';
    } else {
        scale = 1.5; // 超大屏，更大
        bottomPos = '60px';
        rightPos = '40px';
    }
    
    // Apply scale using CSS variable so animation works correctly
    lyingDog.style.setProperty('--dog-scale', scale);
    
    // Also set direct transform for non-animated state
    lyingDog.style.transform = `translateX(0) rotate(-15deg) scale(${scale})`;
    lyingDog.style.transformOrigin = 'center center';
    
    // Always apply position to keep dog in bottom-right corner
    lyingDog.style.bottom = bottomPos;
    lyingDog.style.right = rightPos;
    
    console.log(`Lying dog adapted: scale ${scale}, --dog-scale=${scale}, position bottom:${bottomPos} right:${rightPos}, screen ${screenWidth}x${screenHeight}`);
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

// Responsive adaptation for chapter cards
function adaptChapterCardsSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const chapterCards = document.querySelectorAll('.chapter-card');
    const chapters = document.querySelector('.chapters');
    
    chapterCards.forEach(card => {
        if (screenWidth < 320) {
            card.style.width = '90px';
            card.style.height = '60px';
        } else if (screenWidth < 360) {
            card.style.width = '100px';
            card.style.height = '67px';
        } else if (screenWidth < 480) {
            card.style.width = '120px';
            card.style.height = '80px';
        } else if (screenWidth < 768) {
            card.style.width = '240px';
            card.style.height = '160px';
        } else {
            card.style.width = '';
            card.style.height = '';
        }
        
        // Adjust cover height
        const cover = card.querySelector('.card-cover');
        if (cover) {
            if (screenWidth < 320) {
                cover.style.height = '35px';
            } else if (screenWidth < 360) {
                cover.style.height = '40px';
            } else if (screenWidth < 480) {
                cover.style.height = '50px';
            } else if (screenWidth < 768) {
                cover.style.height = '100px';
            } else {
                cover.style.height = '';
            }
        }
    });
    
    // Adjust track gap
    const track = document.querySelector('.chapters-track');
    if (track) {
        if (screenWidth < 320) {
            track.style.gap = '6px';
            track.style.padding = '0';
        } else if (screenWidth < 360) {
            track.style.gap = '8px';
            track.style.padding = '0';
        } else if (screenWidth < 480) {
            track.style.gap = '10px';
            track.style.padding = '0';
        } else if (screenWidth < 768) {
            track.style.gap = '60px';
            track.style.padding = '';
        } else {
            track.style.gap = '100px';
            track.style.padding = '';
        }
    }
    
    // Adjust chapters container based on height to prevent overlap
    if (chapters) {
        if (screenHeight < 600) {
            // Very short screen - reduce container height and move up
            chapters.style.top = '10%';
            chapters.style.height = '200px';
        } else if (screenHeight < 700) {
            // Short screen
            chapters.style.top = '12%';
            chapters.style.height = '280px';
        } else if (screenWidth < 480) {
            chapters.style.top = '12%';
            chapters.style.height = '380px';
        } else if (screenWidth < 768) {
            chapters.style.top = '15%';
            chapters.style.height = '420px';
        } else {
            chapters.style.top = '';
            chapters.style.height = '';
        }
    }
    
    console.log(`Chapter cards adapted for screen ${screenWidth}x${screenHeight}px`);
}

// Responsive adaptation for button
function adaptButtonSize() {
    if (!whoBehind) return;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let buttonScale, bottomPosition;
    
    // Consider both width and height
    if (screenWidth < 360) {
        buttonScale = 0.7;
        bottomPosition = 20;
    } else if (screenWidth < 480) {
        buttonScale = 0.8;
        bottomPosition = screenHeight < 600 ? 40 : 60;
    } else if (screenWidth < 768) {
        buttonScale = 0.9;
        bottomPosition = screenHeight < 700 ? 50 : 70;
    } else {
        buttonScale = 1.0;
        bottomPosition = screenHeight < 800 ? 60 : 80;
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
    adaptChapterCardsSize(); // Add chapter cards adaptation
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

// ========================================
// CHAPTERS CAROUSEL - Simple wheel conversion
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const viewport = document.querySelector('.chapters-viewport');
        const chapters = document.querySelector('.chapters');
        if (viewport && chapters) {
            // Listen to wheel events on both viewport and chapters for larger scroll area
            const handleWheel = (e) => {
                if (chapters.classList.contains('active')) {
                    // Only prevent default and convert if it's vertical scroll
                    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                        e.preventDefault();
                        viewport.scrollLeft += e.deltaY * 0.9;
                    }
                }
            };
            
            viewport.addEventListener('wheel', handleWheel, { passive: false });
            chapters.addEventListener('wheel', handleWheel, { passive: false });
            
            console.log('Chapters wheel scroll initialized - expanded area');
        }
    }, 5000);
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
    
    // 2400ms: Lying dog slides in from right (after container has slid down)
    setTimeout(() => {
        if (lyingDog) {
            console.log('Adding slide-in class to lying dog');
            
            // Apply initial transform BEFORE adding slide-in class
            adaptLyingDogSize();
            
            lyingDog.classList.add('slide-in');
            
            // Start eye tracking for lying dog
            startLyingDogEyeTracking();
            
            // Apply responsive adaptation again after animation completes
            setTimeout(() => {
                adaptLyingDogSize();
            }, 1500);
        } else {
            console.log('Lying dog element not found!');
        }
    }, 2400);
    
    // 5200ms: Show Chapters carousel (after dog slides in and eyes complete sequence)
    setTimeout(() => {
        const chaptersCarousel = document.getElementById('chaptersCarousel');
        if (chaptersCarousel) {
            chaptersCarousel.classList.add('active');
            // Apply chapter cards adaptation
            adaptChapterCardsSize();
        }
    }, 5200);
    
    // 5400ms: Show who's behind section (slide up from bottom)
    setTimeout(() => {
        whoBehind.classList.add('active');
        
        // Apply responsive adaptation for button
        setTimeout(() => {
            adaptButtonSize();
        }, 100);
    }, 5400);
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

// Switch to About Me mode
function switchToAboutMode() {
    if (pageMode === 'about') return;
    
    pageMode = 'about';
    console.log('Switching to about mode...');
    
    // Hide projects view
    projectsView.classList.remove('active');
    
    // Show about me view
    if (aboutMeView) {
        aboutMeView.classList.add('active');
    }
}

// Switch back to Projects mode from About
function switchBackToProjects() {
    if (pageMode === 'projects') return;
    
    pageMode = 'projects';
    console.log('Switching back to projects mode...');
    
    // Hide about me view
    if (aboutMeView) {
        aboutMeView.classList.remove('active');
    }
    
    // Show projects view with slide down from top animation
    if (projectsView) {
        projectsView.classList.add('active');
    }
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

// Who's Behind button click handler
if (whoBehindButton) {
    whoBehindButton.addEventListener('click', (e) => {
        e.preventDefault();
        switchToAboutMode();
    });
}

// Back to Projects button click handler
if (backToProjectsButton) {
    backToProjectsButton.addEventListener('click', (e) => {
        e.preventDefault();
        switchBackToProjects();
    });
}

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

// ============================================================================
// 3D Card Flip with Random Initial Angles and Spring Return
// ============================================================================

/**
 * Generates random angle for initial card tilt
 */
function randomAngle(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

/**
 * Applies random initial angles to all chapter cards
 */
function initializeCardAngles() {
    const cards = document.querySelectorAll('.chapter-card');
    
    cards.forEach((card, index) => {
        // Generate random 3D angles - larger variety for dramatic differences
        const rx = randomAngle(-20, 20);   // X tilt - vertical perspective (larger)
        const ry = randomAngle(-25, 25);   // Y tilt - horizontal perspective (larger)
        const rz = randomAngle(-15, 15);   // Z rotation - plane rotation (larger)
        const tz = randomAngle(-10, 20);   // Z translation - depth (larger range)
        
        // Generate random float animation properties
        const floatDuration = (2.5 + Math.random() * 1.5).toFixed(2); // 2.5-4s
        const floatDelay = (Math.random() * 2).toFixed(2); // 0-2s
        
        // Store in dataset for spring return
        card.dataset.rz = rz;
        card.dataset.rx = rx;
        card.dataset.ry = ry;
        card.dataset.tz = tz;
        
        // Set initial transform
        const card3d = card.querySelector('.card-3d');
        card3d.style.setProperty('--rz', rz + 'deg');
        card3d.style.setProperty('--rx', rx + 'deg');
        card3d.style.setProperty('--ry', ry + 'deg');
        card3d.style.setProperty('--tz', tz + 'px');
        
        // Set float animation properties
        card.style.setProperty('--float-duration', floatDuration + 's');
        card.style.setProperty('--float-delay', floatDelay + 's');
        
        console.log(`Card ${index} initialized: rz=${rz}°, rx=${rx}°, ry=${ry}°, tz=${tz}px, float=${floatDuration}s delay=${floatDelay}s`);
    });
}

/**
 * Spring animation for card return with overshoot
 */
function springReturn(card) {
    const card3d = card.querySelector('.card-3d');
    const rz = card.dataset.rz || '0';
    const rx = card.dataset.rx || '0';
    const ry = card.dataset.ry || '0';
    const tz = card.dataset.tz || '0';
    
    // Remove is-active for smooth transition
    card3d.classList.remove('is-active');
    
    // Apply spring-like easing with overshoot
    card3d.style.transition = 'transform 0.32s cubic-bezier(0.18, 0.9, 0.2, 1.1)';
    
    // Set to initial angles with slight overshoot (target + 2° then back)
    const overshootZ = (parseFloat(rz) + (parseFloat(rz) > 0 ? 2 : -2)).toFixed(2);
    
    // First: overshoot (slightly past target)
    setTimeout(() => {
        card3d.style.setProperty('--rz', overshootZ + 'deg');
        card3d.style.setProperty('--rx', '0deg');
        card3d.style.setProperty('--ry', '0deg');
        card3d.style.setProperty('--tz', '0px');
    }, 10);
    
    // Then: return to normal position with random angles
    setTimeout(() => {
        card3d.style.transition = 'transform 0.24s cubic-bezier(0.2, 0.8, 0.2, 1)';
        card3d.style.setProperty('--rz', rz + 'deg');
        card3d.style.setProperty('--rx', rx + 'deg');
        card3d.style.setProperty('--ry', ry + 'deg');
        card3d.style.setProperty('--tz', tz + 'px');
    }, 160);
}

/**
 * Calculates 3D tilt based on mouse position
 */
function calculateTilt(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize to [-1, 1]
    const nx = Math.min(Math.max((x / rect.width) * 2 - 1, -1), 1);
    const ny = Math.min(Math.max((y / rect.height) * 2 - 1, -1), 1);
    
    // Calculate tilt angles - 15° for very dramatic, flexible effect
    // X axis reversed for natural feel
    const tx = (-ny * 15).toFixed(2);
    const ty = (nx * 15).toFixed(2);
    
    return { tx, ty };
}

/**
 * Attaches 3D tilt and flip effects to chapter cards
 */
function attachChapterCardEffects() {
    const cards = document.querySelectorAll('.chapter-card');
    
    if (cards.length === 0) return;
    
    let targetTx = 0, targetTy = 0;
    let currentTx = 0, currentTy = 0;
    let raf = null;
    
    function animate() {
        // Smooth interpolation with easing - slow follow with strong inertia
        currentTx += (targetTx - currentTx) * 0.08; // 0.08 = much slower follow (more inertia)
        currentTy += (targetTy - currentTy) * 0.08;
        
        // Apply to all cards
        cards.forEach(card => {
            const card3d = card.querySelector('.card-3d');
            if (card.classList.contains('is-active')) {
                card3d.style.setProperty('--tx', currentTx.toFixed(2) + 'deg');
                card3d.style.setProperty('--ty', currentTy.toFixed(2) + 'deg');
            }
        });
        
        // Continue animation if still moving
        if (Math.abs(targetTx - currentTx) > 0.1 || Math.abs(targetTy - currentTy) > 0.1) {
            raf = requestAnimationFrame(animate);
        } else {
            raf = null;
        }
    }
    
    function onMove(e) {
        const card = e.currentTarget;
        const card3d = card.querySelector('.card-3d');
        const { tx, ty } = calculateTilt(e, card);
        
        targetTx = parseFloat(tx);
        targetTy = parseFloat(ty);
        
        card3d.classList.add('is-active');
        card.classList.add('is-active');
        
        // Start animation if not running
        if (!raf) {
            raf = requestAnimationFrame(animate);
        }
    }
    
    function onLeave(e) {
        const card = e.currentTarget;
        const card3d = card.querySelector('.card-3d');
        
        // Smooth return to 0
        targetTx = 0;
        targetTy = 0;
        
        // Start smooth animation to return to center
        if (!raf) {
            raf = requestAnimationFrame(animate);
        }
        
        // After smooth return, apply spring return to random angle
        setTimeout(() => {
            card3d.classList.remove('is-active');
            card.classList.remove('is-active');
            card3d.style.setProperty('--tx', '0deg');
            card3d.style.setProperty('--ty', '0deg');
            
            if (raf) {
                cancelAnimationFrame(raf);
                raf = null;
            }
            
            // Spring return to random initial angle
            springReturn(card);
        }, 200); // Wait for smooth return animation
    }
    
    // Attach to each card
    cards.forEach(card => {
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        
        // Touch support for mobile
        card.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.changedTouches[0];
            const fakeEvent = {
                clientX: touch.clientX,
                clientY: touch.clientY
            };
            onMove(fakeEvent);
        });
        card.addEventListener('touchend', onLeave);
    });
}

// Function to detect which card is centered with throttling
let rafId = null;
function updateCenteredCard() {
    if (rafId) cancelAnimationFrame(rafId);
    
    rafId = requestAnimationFrame(() => {
        const cards = document.querySelectorAll('.chapter-card');
        const viewport = document.querySelector('.chapters-viewport');
        if (!viewport || cards.length === 0) return;
        
        const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
        
        // Find the closest card to center
        let closestCard = null;
        let closestDistance = Infinity;
        
        cards.forEach(card => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(cardCenter - viewportCenter);
            
            // Remove centered from all first
            card.classList.remove('is-centered');
            
            // Track closest card
            if (distance < closestDistance) {
                closestDistance = distance;
                closestCard = card;
            }
        });
        
        // Only mark the closest card as centered (only if within reasonable distance)
        if (closestCard && closestDistance < 240) { // Half of card width
            closestCard.classList.add('is-centered');
        }
        
        rafId = null;
    });
}

// Initialize immediately when script loads
initializeCardAngles();

// Attach effects when carousel becomes active
setTimeout(() => {
    // Re-initialize angles when carousel appears
    initializeCardAngles();
    attachChapterCardEffects();
    
    // Center detection for auto-scaling centered card
    const viewport = document.querySelector('.chapters-viewport');
    if (viewport) {
        let isUpdating = false;
        let snapTimeout = null;
        
        // Update on scroll
        viewport.addEventListener('scroll', () => {
            if (!isUpdating) {
                isUpdating = true;
                requestAnimationFrame(() => {
                    updateCenteredCard();
                    isUpdating = false;
                });
            }
            
            // Snap to nearest card after scroll ends
            clearTimeout(snapTimeout);
            snapTimeout = setTimeout(() => {
                const cards = document.querySelectorAll('.chapter-card');
                if (!viewport || cards.length === 0) return;
                
                let closestCard = null;
                let closestDistance = Infinity;
                const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
                
                cards.forEach(card => {
                    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                    const distance = Math.abs(cardCenter - viewportCenter);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestCard = card;
                    }
                });
                
                // Snap to center if far enough
                if (closestCard && closestDistance > 30) {
                    const targetLeft = closestCard.offsetLeft + closestCard.offsetWidth / 2 - viewport.offsetWidth / 2;
                    viewport.scrollTo({ left: targetLeft, behavior: 'smooth' });
                }
            }, 150);
        }, { passive: true });
        
        updateCenteredCard(); // Initial check
    }
}, 4500);

// Initialize sparkles for photo frame
function initPhotoSparkles() {
    const container = document.getElementById('photoSparkles');
    if (!container) return;
    
    const colors = ['#9E7AFF', '#FE8BBB', '#FFD700', '#FFA07A'];
    const sparklesCount = 6; // Reduced count for more spacing
    const sizeVariations = [15, 28, 50]; // Even larger sizes
    
    // Track last color to avoid consecutive same colors
    let lastColor = null;
    
    const getRandomColor = () => {
        let color;
        do {
            color = colors[Math.floor(Math.random() * colors.length)];
        } while (color === lastColor && colors.length > 1); // Ensure different color
        lastColor = color;
        return color;
    };
    
    const createSparkle = (position) => {
        // Position is either 'top-left' or 'bottom-right'
        let x, y;
        let color = getRandomColor(); // Use function to avoid consecutive same colors
        let delay = Math.random() * 3; // Increased delay range for more spacing
        let duration = Math.random() * 1.5 + 0.8;
        let size = sizeVariations[Math.floor(Math.random() * sizeVariations.length)];
        
        // Photo is at: left=40px, top=15px, size 220x270
        // Frame is 300x300
        
        if (position === 'top-left') {
            // Top-left corner: right at the photo edge
            // X: 0-35px (left side near frame)
            // Y: 12-20px (right at photo top edge which is at 15px)
            x = Math.random() * 35 + 20;
            y = Math.random() * 8 + 40;
        } else { // bottom-right
            // Bottom-right corner: can be a bit on the photo for visibility
            // Photo ends at: left=260px, top=285px
            // Move upward and slightly into photo area for visibility
            x = Math.random() * 28 + 200;
            y = Math.random() * 20 + 215;
        }
        
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.animation = `sparkle-animation ${duration}s ease-in-out ${delay}s infinite`;
        
        sparkle.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 21 21">
                <path d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z" fill="${color}"/>
            </svg>
        `;
        
        sparkle.style.setProperty('--sparkle-scale', size / 10); // Scale animation based on size
        
        container.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, (duration + delay) * 1000);
    };
    
    // Create initial sparkles - half at top-left, half at bottom-right
    for (let i = 0; i < sparklesCount; i++) {
        const position = i % 2 === 0 ? 'top-left' : 'bottom-right';
        setTimeout(() => createSparkle(position), i * 500); // Increased interval from 200 to 400
    }
    
    // Continuously generate new sparkles
    setInterval(() => {
        // Randomly choose corner
        const position = Math.random() < 0.5 ? 'top-left' : 'bottom-right';
        createSparkle(position);
    }, 1200); // Increased interval from 600 to 1200ms
}

// Initialize sparkles when about me page loads
document.addEventListener('DOMContentLoaded', () => {
    initPhotoSparkles();
});
