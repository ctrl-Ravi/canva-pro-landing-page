// Complete replacement for scripts.js - Mobile-friendly version
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    initFaqAccordion();
    
    // Pricing tabs functionality
    initPricingTabs();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Initialize testimonial slider
    initTestimonialSlider();
});

// Initialize FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Activate the first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

// Initialize Pricing Tabs
function initPricingTabs() {
    // Get all necessary elements
    const tabOptions = document.querySelectorAll('.tab-option');
    const priceCards = document.querySelectorAll('.price-card[data-term]');
    const tabSlider = document.querySelector('.tab-slider');
    const navDots = document.querySelectorAll('.term-nav .carousel-dot');
    
    // Check if elements exist before proceeding
    if (!tabOptions.length || !priceCards.length) {
        console.error("Pricing tabs elements not found");
        return;
    }
    
    console.log("Initializing pricing tabs");
    
    // Handle tab click directly
    function handleTabClick() {
        // Get the term from the clicked tab
        const term = this.getAttribute('data-term');
        console.log("Tab clicked:", term);
        
        // Skip if already active
        if (this.classList.contains('active')) {
            console.log("Tab already active - skipping");
            return;
        }
        
        // Update tab states
        tabOptions.forEach(tab => tab.classList.remove('active'));
        this.classList.add('active');
        
        // Move the slider
        const index = Array.from(tabOptions).indexOf(this);
        moveSlider(index);
        
        // Update card visibility
        priceCards.forEach(card => {
            const cardTerm = card.getAttribute('data-term');
            const isMatch = cardTerm === term;
            
            // Update card state
            card.classList.toggle('active', isMatch);
            
            if (isMatch) {
                // Show and highlight this card
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                
                // Scroll to it on mobile
                if (window.innerWidth <= 768) {
                    setTimeout(function() {
                        const carousel = document.querySelector('.pricing-carousel');
                        if (carousel) {
                            // Center the card in the viewport
                            const cardLeft = card.offsetLeft;
                            const carouselWidth = carousel.offsetWidth;
                            const cardWidth = card.offsetWidth;
                            const scrollTo = cardLeft - (carouselWidth/2) + (cardWidth/2);
                            
                            carousel.scrollTo({
                                left: scrollTo,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
            } else {
                // Desktop: hide other cards
                if (window.innerWidth > 768) {
                    // Fade out then hide
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(function() {
                        card.style.display = 'none';
                    }, 300);
                } else {
                    // Mobile: just dim other cards but keep visible
                    card.style.opacity = '0.6';
                    card.style.transform = 'scale(0.95)';
                }
            }
        });
        
        // Update dots in the navigation
        updateDots(term);
    }
    
    // Move the tab slider
    function moveSlider(index) {
        if (!tabSlider) return;
        
        // Position based on index
        if (index === 0) {
            tabSlider.style.left = '6px';
        } else if (index === 1) {
            tabSlider.style.left = 'calc(33.333% + 2px)';
        } else if (index === 2) {
            tabSlider.style.left = 'calc(66.666% - 2px)';
        }
    }
    
    // Update the navigation dots
    function updateDots(term) {
        if (!navDots || navDots.length === 0) return;
        
        const termIndex = Array.from(tabOptions).findIndex(tab => 
            tab.getAttribute('data-term') === term
        );
        
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === termIndex);
            
            // Add click handler to dots if not already added
            if (!dot.hasClickHandler) {
                dot.hasClickHandler = true;
                dot.addEventListener('click', function() {
                    // Find corresponding tab and click it
                    if (tabOptions[i]) {
                        tabOptions[i].click();
                    }
                });
            }
        });
    }
    
    // Fix 1: Use direct event handlers instead of onclick
    tabOptions.forEach((tab, index) => {
        // Remove any existing handlers to avoid conflicts
        tab.removeEventListener('click', tab.clickHandler);
        
        // Create a handler and reference it
        tab.clickHandler = handleTabClick.bind(tab);
        
        // Add new handler
        tab.addEventListener('click', tab.clickHandler);
        
        // Also add touchend for mobile
        tab.addEventListener('touchend', function(e) {
            e.preventDefault();
            tab.clickHandler(); // Execute the click handler directly
        }, { passive: false });
        
        console.log(`Added click handler to tab ${index}: ${tab.getAttribute('data-term')}`);
    });
    
    // Make sure pricing cards have transitions
    priceCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    // Initialize - activate the default tab (1month)
    const defaultTab = document.querySelector('.tab-option[data-term="1month"]');
    if (defaultTab) {
        console.log("Setting default tab to 1month");
        
        // Fix 2: Trigger click event programmatically instead of manual setup
        setTimeout(() => {
            defaultTab.click();
            console.log("Default tab click triggered");
        }, 100);
    } else {
        console.error("Default tab not found");
    }
    
    // Fix 3: Add a window load event to ensure everything is fully loaded
    window.addEventListener('load', function() {
        console.log("Window fully loaded - reinitializing pricing tabs");
        
        // Ensure the default tab is activated
        if (defaultTab && !defaultTab.classList.contains('active')) {
            defaultTab.click();
        }
        
        // On mobile, ensure the carousel is properly configured
        if (window.innerWidth <= 768) {
            const carousel = document.querySelector('.pricing-carousel');
            if (carousel) {
                carousel.style.display = 'flex';
                carousel.style.overflowX = 'auto';
                carousel.style.scrollSnapType = 'x mandatory';
                carousel.style.webkitOverflowScrolling = 'touch';
                
                // Make all cards fixed width for proper scrolling
                priceCards.forEach(card => {
                    card.style.minWidth = '260px';
                    card.style.width = '85%';
                    card.style.scrollSnapAlign = 'center';
                    card.style.margin = '0 10px';
                    card.style.flexShrink = '0';
                });
            }
        }
    });
}

// Initialize Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Testimonial Slider Function
function initTestimonialSlider() {
    const testimonialSlider = document.getElementById('testimonialSlider');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    const testimonialControl = document.querySelector('.testimonial-control');
    const mobileView = window.matchMedia('(max-width: 767px)');
    
    if (!testimonialSlider || !testimonials.length || !dots.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    const slideTime = 4000; // 4 seconds per slide
    
    // Initialize the slider
    function initSlider() {
        if (mobileView.matches) {
            // Mobile view setup
            if (testimonialControl) testimonialControl.style.display = 'flex';
            
            // Set slider properties
            testimonialSlider.style.width = '300%';
            testimonialSlider.style.display = 'flex';
            testimonialSlider.style.transition = 'transform 0.5s ease';
            
            // Set testimonial properties
            testimonials.forEach(t => {
                t.style.width = '33.333%';
                t.style.minWidth = '33.333%';
                t.style.maxWidth = '33.333%';
                t.style.flex = '0 0 auto';
                t.style.margin = '0';
            });
            
            // Set initial position
            updateSlidePosition();
            
            // Start auto-sliding
            startAutoSlide();
            
            // Handle dot navigation
            setupDotNavigation();
            
            // Handle touch events
            setupTouchEvents();
        } else {
            // Desktop view setup
            if (testimonialControl) testimonialControl.style.display = 'none';
            
            // Reset properties
            testimonialSlider.style.transform = '';
            testimonialSlider.style.width = '100%';
            
            testimonials.forEach(t => {
                t.style.width = '';
                t.style.minWidth = '';
                t.style.maxWidth = '';
                t.style.flex = '';
                t.style.margin = '';
            });
            
            // Clear auto-sliding
            clearInterval(slideInterval);
        }
    }
    
    // Setup dot navigation
    function setupDotNavigation() {
        dots.forEach((dot, index) => {
            // Remove existing handlers
            dot.removeEventListener('click', dot.clickHandler);
            
            // Add new handler
            dot.clickHandler = () => {
                goToSlide(index);
                restartAutoSlide();
            };
            
            dot.addEventListener('click', dot.clickHandler);
        });
    }
    
    // Setup touch events for swipe
    function setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Remove existing handlers
        testimonialSlider.removeEventListener('touchstart', testimonialSlider.touchStartHandler);
        testimonialSlider.removeEventListener('touchend', testimonialSlider.touchEndHandler);
        
        // Add touch start handler
        testimonialSlider.touchStartHandler = (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        };
        
        // Add touch end handler
        testimonialSlider.touchEndHandler = (e) => {
            touchEndX = e.changedTouches[0].screenX;
            
            // Handle swipe if above threshold
            const swipeThreshold = 50;
            const swipeDifference = Math.abs(touchEndX - touchStartX);
            
            if (swipeDifference > swipeThreshold) {
                if (touchEndX < touchStartX) {
                    goToSlide(currentSlide + 1); // Swipe left - next slide
                } else {
                    goToSlide(currentSlide - 1); // Swipe right - previous slide
                }
            }
            
            restartAutoSlide();
        };
        
        // Add event listeners
        testimonialSlider.addEventListener('touchstart', testimonialSlider.touchStartHandler, false);
        testimonialSlider.addEventListener('touchend', testimonialSlider.touchEndHandler, false);
    }
    
    // Go to a specific slide
    function goToSlide(slideIndex) {
        // Handle loop
        if (slideIndex >= testimonials.length) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = testimonials.length - 1;
        }
        
        // Update current slide
        currentSlide = slideIndex;
        
        // Update slider position
        updateSlidePosition();
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Update slide position
    function updateSlidePosition() {
        if (testimonials.length > 0 && mobileView.matches) {
            testimonialSlider.style.transform = `translateX(-${currentSlide * 33.333}%)`;
        }
    }
    
    // Start auto sliding
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, slideTime);
    }
    
    // Restart auto slide after interaction
    function restartAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Initialize slider
    initSlider();
    
    // Re-initialize on window resize
    window.addEventListener('resize', initSlider);
} 