/**
 * Standalone pricing tabs script for Canva Pro landing page
 * This file handles only the pricing tabs functionality to ensure it works
 * after deployment to the server, independent of any other scripts.
 */

(function() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', initializePricingTabs);
    
    // Also try again when window loads (for reliability)
    window.addEventListener('load', initializePricingTabs);
    
    function initializePricingTabs() {
        // Get all necessary elements
        const tabOptions = document.querySelectorAll('.tab-option');
        const priceCards = document.querySelectorAll('.price-card[data-term]');
        const tabSlider = document.querySelector('.tab-slider');
        const navDots = document.querySelectorAll('.term-nav .carousel-dot');
        
        // Check if elements exist
        if (!tabOptions.length || !priceCards.length) {
            console.warn("Pricing tabs: Elements not found");
            return;
        }
        
        // Add click handlers to all tabs
        tabOptions.forEach(function(tab) {
            // Skip if already initialized
            if (tab.hasInitialized) return;
            tab.hasInitialized = true;
            
            // Add click handler
            tab.addEventListener('click', function() {
                const term = this.getAttribute('data-term');
                
                // Skip if already active
                if (this.classList.contains('active')) return;
                
                // Update tab states
                tabOptions.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Move the slider
                const index = Array.from(tabOptions).indexOf(this);
                if (tabSlider) {
                    if (index === 0) tabSlider.style.left = '6px';
                    else if (index === 1) tabSlider.style.left = 'calc(33.333% + 2px)';
                    else if (index === 2) tabSlider.style.left = 'calc(66.666% - 2px)';
                }
                
                // Update card visibility
                priceCards.forEach(card => {
                    const cardTerm = card.getAttribute('data-term');
                    const isMatch = cardTerm === term;
                    
                    // Update card state
                    card.classList.toggle('active', isMatch);
                    
                    if (isMatch) {
                        // Show matching card
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
                if (navDots && navDots.length > 0) {
                    const termIndex = Array.from(tabOptions).findIndex(t => 
                        t.getAttribute('data-term') === term
                    );
                    
                    navDots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === termIndex);
                    });
                }
            });
            
            // Add touchend for mobile
            tab.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            }, false);
        });
        
        // Make sure pricing cards have transitions
        priceCards.forEach(card => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
        
        // Initialize - activate the default tab (1month)
        const defaultTab = document.querySelector('.tab-option[data-term="1month"]');
        if (defaultTab) {
            // Use timeout to ensure everything is ready
            setTimeout(function() {
                // Only trigger if not already active
                if (!defaultTab.classList.contains('active')) {
                    defaultTab.click();
                }
            }, 100);
        }
        
        // Configure mobile carousel
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
    }
})(); 