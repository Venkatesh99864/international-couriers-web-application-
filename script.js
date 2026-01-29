/**
 * SKY EXPRESS - INTERNATIONAL COURIERS VIZAG
 * CORE ENGINE V2.0 (Premium Visual Wonder Edition)
 * Features: WhatsApp Integration, Parallax Effects, GSAP-style Transitions
 */

"use strict";

const SkyExpressEngine = (() => {
    // --- Configuration & Constants ---
    const CONFIG = {
        businessNumber: "918121592299", //
        locationName: "Sundar Nagar, Vizag Hub", //
        animationDuration: 1200,
        scrollThreshold: 100,
        loaderDelay: 1800
    };

    // --- DOM Elements ---
    const dom = {
        navbar: document.getElementById('navbar'),
        loader: document.getElementById('loader-wrapper'),
        pickupForm: document.getElementById('skyExpressForm'),
        navLinks: document.querySelectorAll('.nav-links a'),
        mobileBtn: document.querySelector('.mobile-menu-btn'),
        statNums: document.querySelectorAll('.stat-num')
    };

    /**
     * Initialize all modules
     */
    const init = () => {
        handlePreloader();
        setupNavbarScroll();
        initScrollAnimations();
        setupWhatsAppForm();
        setupSmoothScrolling();
        initCounterEffect();
        handleMobileMenu();
        injectVisualPolish();
    };

    /**
     * 1. PRELOADER & ENTRANCE ANIMATION
     * Manages the "Visual Wonder" entrance experience
     */
    const handlePreloader = () => {
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (dom.loader) {
                    dom.loader.style.opacity = '0';
                    dom.loader.style.visibility = 'hidden';
                    
                    // Trigger AOS refresh to sync with loader removal
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                    
                    document.body.style.overflowY = 'auto';
                    console.log("SKY EXPRESS: Interface Ready");
                }
            }, CONFIG.loaderDelay);
        });
    };

    /**
     * 2. SMART NAVBAR TRANSITIONS
     * Changes appearance based on scroll depth for Glassmorphism effect
     */
    const setupNavbarScroll = () => {
        const handleScroll = () => {
            if (window.scrollY > CONFIG.scrollThreshold) {
                dom.navbar.classList.add('scrolled');
            } else {
                dom.navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on init
    };

    /**
     * 3. WHATSAPP DISPATCH ENGINE
     * Formats user data into a professional business order
     */
    const setupWhatsAppForm = () => {
        if (!dom.pickupForm) return;

        dom.pickupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract Data
            const formData = {
                name: document.getElementById('cust_name').value.trim(),
                phone: document.getElementById('cust_phone').value.trim(),
                service: document.getElementById('service_type').value,
                address: document.getElementById('cust_address').value.trim(),
                timestamp: new Date().toLocaleString()
            };

            // Validation Animation
            const submitBtn = dom.pickupForm.querySelector('.submit-wa');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> GENERATING REQUEST...`;

            // Professional Message Formatting
            const message = 
                `*🚀 SKY EXPRESS - NEW PICKUP REQUEST*%0A` +
                `----------------------------------------%0A` +
                `👤 *Customer:* ${formData.name}%0A` +
                `📞 *Contact:* ${formData.phone}%0A` +
                `📦 *Service:* ${formData.service} Courier%0A` +
                `📍 *Address:* ${formData.address}%0A` +
                `----------------------------------------%0A` +
                `🕒 *Requested at:* ${formData.timestamp}%0A` +
                `🏙️ *Hub:* ${CONFIG.locationName}`;

            const whatsappURL = `https://wa.me/${CONFIG.businessNumber}?text=${message}`;

            // Visual Delay for "Wonder" Effect
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                // Reset Form and UI
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> REQUEST SENT!`;
                submitBtn.style.background = "#0046b8";
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = "";
                    dom.pickupForm.reset();
                }, 3000);
            }, 1000);
        });
    };

    /**
     * 4. SCROLL ANIMATION INITIALIZATION
     */
    const initScrollAnimations = () => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                offset: 120,
                delay: 50,
                duration: 800,
                easing: 'ease-in-out-cubic',
                once: true,
                mirror: false,
                anchorPlacement: 'top-bottom',
            });
        }
    };

    /**
     * 5. SMART SMOOTH SCROLLING
     */
    const setupSmoothScrolling = () => {
        dom.navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const offsetPosition = target.offsetTop - 80;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });

                        // Update Active State
                        dom.navLinks.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });
    };

    /**
     * 6. DATA COUNTER EFFECT
     * Animates numbers as they scroll into view
     */
    const initCounterEffect = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.innerText);
                    animateNumber(target, 0, endValue, 2000);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        dom.statNums.forEach(num => observer.observe(num));
    };

    const animateNumber = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + "%";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    /**
     * 7. MOBILE MENU LOGIC
     */
    const handleMobileMenu = () => {
        if (!dom.mobileBtn) return;

        dom.mobileBtn.addEventListener('click', () => {
            dom.mobileBtn.classList.toggle('active');
            const navMenu = document.querySelector('.nav-links');
            navMenu.classList.toggle('show');
        });
    };

    /**
     * 8. VISUAL POLISH (Cursor & Hover Effects)
     */
    const injectVisualPolish = () => {
        // Subtle Parallax on Hero Image
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            const heroImg = document.querySelector('.main-hero-img');
            
            if (heroImg) {
                heroImg.style.transform = `perspective(1000px) rotateY(${-5 + moveX}deg) rotateX(${moveY}deg)`;
            }
        });
    };

    // --- Public API ---
    return {
        run: init
    };

})();

// Start the Engine
SkyExpressEngine.run();
// ... [Previous SkyExpressEngine code] ...

const Airspace = (() => {
    const container = document.getElementById('airspace-container');
    const colors = ['plane-blue', 'plane-orange', 'plane-purple'];

    const createPlane = () => {
        const plane = document.createElement('div');
        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        plane.className = `dynamic-plane ${colorClass}`;
        plane.innerHTML = `<i class="fas fa-plane"></i><div class="courier-box"><i class="fas fa-box"></i></div>`;
        
        // Random Start Position
        const side = Math.floor(Math.random() * 4); // 0:Top, 1:Right, 2:Bottom, 3:Left
        let x = 0, y = 0;
        if(side === 0) { x = Math.random() * 100; y = -10; }
        else if(side === 1) { x = 110; y = Math.random() * 100; }
        else if(side === 2) { x = Math.random() * 100; y = 110; }
        else { x = -10; y = Math.random() * 100; }

        plane.style.left = x + 'vw';
        plane.style.top = y + 'vh';
        container.appendChild(plane);

        // Random 3D Destination
        const destX = Math.random() * 100;
        const destY = Math.random() * 100;
        const rotation = Math.atan2(destY - y, destX - x) * (180 / Math.PI);

        const animation = plane.animate([
            { transform: `translate(0,0) rotate(${rotation}deg) rotateX(20deg)` },
            { transform: `translate(${(destX-x)}vw, ${(destY-y)}vh) rotate(${rotation}deg) rotateX(-20deg)` }
        ], {
            duration: 8000 + Math.random() * 5000,
            iterations: Infinity,
            direction: 'alternate'
        });

        // Tap to Stop & Load Courier
        plane.onclick = () => {
            animation.pause();
            plane.classList.add('loading-package');
            
            setTimeout(() => {
                plane.classList.remove('loading-package');
                plane.classList.add('plane-closed'); // Visual "Closed" state
                
                setTimeout(() => {
                    animation.play(); // Travel again
                }, 500);
            }, 1000);
        };
    };

    return { init: () => { for(let i=0; i<5; i++) createPlane(); } };
})();

// FINAL EXECUTION LINE
SkyExpressEngine.run(); 
Airspace.init(); // <--- Paste and call it here