/**
 * DESDE EL SILENCIO - Main JavaScript
 * Handles mobile menu toggle, sticky header, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements ---
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');
    const fadeSections = document.querySelectorAll('.fade-in-section');

    // --- 1. Sticky Header ---
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check on load
    handleScroll();

    // --- 2. Mobile Menu Toggle ---
    const toggleMenu = () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        mobileOverlay.classList.toggle('visible');
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    const closeMenu = () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- 3. Intersection Observer for scroll animations ---
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeSections.forEach(item => {
        item.classList.add('fade-in');
        appearOnScroll.observe(item);
    });
});
