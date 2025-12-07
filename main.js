/**
 * SEVAAMRIT - Main JavaScript
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // ===================================
    // NAVIGATION
    // ===================================

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on load

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ===================================
    // IMPACT COUNTER ANIMATION
    // ===================================

    const impactNumbers = document.querySelectorAll('.impact-number');
    let countersAnimated = false;

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num.toLocaleString() + '+';
    }

    function animateCounters() {
        if (countersAnimated) return;

        impactNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const startTime = Date.now();

            function updateCounter() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(target * easeOutQuart);

                counter.textContent = formatNumber(current);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = formatNumber(target);
                }
            }

            updateCounter();
        });

        countersAnimated = true;
    }

    // Intersection Observer for counter animation
    const impactSection = document.getElementById('impact');

    if (impactSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });

        counterObserver.observe(impactSection);
    }

    // ===================================
    // DONATION AMOUNT BUTTONS
    // ===================================

    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    let selectedAmount = 1000;

    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update selected amount
            selectedAmount = parseInt(this.getAttribute('data-amount'));
            // Clear custom input
            if (customAmountInput) {
                customAmountInput.value = '';
            }
        });
    });

    // Custom amount input handler
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            if (this.value) {
                amountButtons.forEach(btn => btn.classList.remove('active'));
                selectedAmount = parseInt(this.value) || 0;
            }
        });

        customAmountInput.addEventListener('focus', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
        });
    }

    // Donate button click
    const donateBtn = document.querySelector('.donate-btn');

    if (donateBtn) {
        donateBtn.addEventListener('click', function() {
            const donationType = document.querySelector('input[name="donationType"]:checked').value;
            const amount = customAmountInput && customAmountInput.value
                ? parseInt(customAmountInput.value)
                : selectedAmount;

            if (amount < 100) {
                showNotification('Minimum donation amount is ₹100', 'error');
                return;
            }

            // Show success message (in production, this would redirect to payment gateway)
            showNotification(`Thank you! Processing ₹${amount.toLocaleString()} ${donationType} donation...`, 'success');

            // Simulate redirect to payment (remove in production)
            setTimeout(() => {
                showNotification('In production, you would be redirected to the payment gateway.', 'info');
            }, 2000);
        });
    }

    // ===================================
    // NOTIFICATION SYSTEM
    // ===================================

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            background: ${getNotificationColor(type)};
            color: white;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 10px;
        `;
        closeBtn.addEventListener('click', () => notification.remove());

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    function getNotificationColor(type) {
        const colors = {
            success: '#2E8B57',
            error: '#dc3545',
            info: '#FF9933'
        };
        return colors[type] || colors.info;
    }

    // Add notification animations to head
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // BACK TO TOP BUTTON
    // ===================================

    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // NEWSLETTER FORM
    // ===================================

    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');

        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate subscription
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        });
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ===================================
    // PARALLAX EFFECT FOR HERO
    // ===================================

    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');

            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / 700);
            }
        });
    }

    // ===================================
    // LAZY LOADING IMAGES
    // ===================================

    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ===================================
    // TESTIMONIAL SLIDER (if needed)
    // ===================================

    // For a more advanced slider, you could integrate Swiper.js
    // This is a basic auto-scroll for testimonials

    const testimonialCards = document.querySelectorAll('.testimonial-card');

    if (testimonialCards.length > 0) {
        testimonialCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // ===================================
    // MAP PINS ANIMATION
    // ===================================

    const pins = document.querySelectorAll('.location-pins .pin');

    if (pins.length > 0) {
        pins.forEach((pin, index) => {
            pin.style.animationDelay = `${index * 0.3}s`;
        });
    }

    // ===================================
    // INITIATIVE CARDS HOVER EFFECT
    // ===================================

    const initiativeCards = document.querySelectorAll('.initiative-card');

    initiativeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.card-image img').style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.card-image img').style.transform = 'scale(1)';
        });
    });

    // ===================================
    // VIDEO FALLBACK
    // ===================================

    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            // If video fails to load, show a gradient background
            const videoContainer = document.querySelector('.hero-video-container');
            if (videoContainer) {
                videoContainer.style.background = 'linear-gradient(135deg, #8B4513 0%, #FF9933 50%, #2E8B57 100%)';
                this.style.display = 'none';
            }
        });

        // Pause video when not in viewport for performance
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(() => {});
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.25 });

        videoObserver.observe(heroVideo);
    }

    // ===================================
    // ACCESSIBILITY IMPROVEMENTS
    // ===================================

    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: fixed;
        top: -40px;
        left: 10px;
        padding: 8px 16px;
        background: #FF9933;
        color: white;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', function() {
        this.style.top = '10px';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // ===================================
    // PRELOADER (Optional)
    // ===================================

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Trigger AOS refresh after load
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    });

    // ===================================
    // CONSOLE WELCOME MESSAGE
    // ===================================

    console.log('%c🙏 Sevaamrit', 'font-size: 24px; font-weight: bold; color: #FF9933;');
    console.log('%cPreserving Dignity, Nourishing Lives', 'font-size: 14px; color: #8B4513;');
    console.log('%c-----------------------------------', 'color: #ccc;');
    console.log('%cWant to contribute to our codebase? Get in touch!', 'font-size: 12px; color: #2E8B57;');
});

