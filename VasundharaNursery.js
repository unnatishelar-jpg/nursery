/* ============================================
   VASUNDHARA NURSERY - PREMIUM SCRIPTS
   Modern Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // LOADING SCREEN
    // ============================================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
            initAnimations();
        }, 2500);
    });

    // ============================================
    // INITIALIZE AOS (Animate On Scroll)
    // ============================================
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: 'mobile'
    });

    // ============================================
    // GSAP ANIMATIONS
    // ============================================
    function initAnimations() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Hero parallax effect
        gsap.to('.hero', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            backgroundPositionY: '50%'
        });

        // Hero content fade on scroll
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: '50% top',
                scrub: 1
            },
            opacity: 0,
            y: -100
        });

        // Section reveals
        gsap.utils.toArray('section').forEach(section => {
            gsap.fromTo(section.querySelectorAll('.section-header'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Sandalwood parallax
        gsap.to('.sandalwood-showcase', {
            scrollTrigger: {
                trigger: '.sandalwood-showcase',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            backgroundPositionY: '100%'
        });

        // Gallery items stagger
        gsap.fromTo('.gallery-item',
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.gallery-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    const scrollProgress = document.getElementById('scrollProgress');
    
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);

    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll handler for navbar
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ============================================
    // FLOATING LEAVES ANIMATION
    // ============================================
    const floatingLeaves = document.getElementById('floatingLeaves');
    const leafIcons = ['fa-leaf', 'fa-seedling', 'fa-canadian-maple-leaf'];

    function createFloatingLeaf() {
        const leaf = document.createElement('i');
        const randomIcon = leafIcons[Math.floor(Math.random() * leafIcons.length)];
        leaf.className = `fas ${randomIcon} floating-leaf`;
        
        // Random position and animation duration
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = (Math.random() * 10 + 15) + 's';
        leaf.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        leaf.style.opacity = Math.random() * 0.3 + 0.1;
        
        floatingLeaves.appendChild(leaf);
        
        // Remove leaf after animation
        setTimeout(() => {
            leaf.remove();
        }, 25000);
    }

    // Create leaves periodically
    setInterval(createFloatingLeaf, 3000);
    
    // Create initial leaves
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingLeaf, i * 600);
    }

    // ============================================
    // MOUSE GLOW EFFECT
    // ============================================
    const mouseGlow = document.getElementById('mouseGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', function() {
        mouseGlow.classList.remove('active');
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        mouseGlow.style.left = glowX + 'px';
        mouseGlow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateGlow);
    }

    animateGlow();

    // ============================================
    // HERO PARTICLES
    // ============================================
    const heroParticles = document.getElementById('heroParticles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(167, 243, 208, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 5 + 5
            }