/* ========================================= */
/* home-scripts.js - Animated Counter Logic  */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    const counterSection = document.getElementById('counter-section');
    const counters = document.querySelectorAll('.counter-number');
    let animationStarted = false; // Flag to prevent re-running

    const startCounterAnimation = () => {
        if (animationStarted) return;
        animationStarted = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const label = counter.getAttribute('data-label') || '';
            const duration = 2000; // 2 seconds
            let start = 0;
            const step = Math.ceil(target / (duration / 10)); // Increment size

            const updateCounter = () => {
                start += step;
                if (start < target) {
                    counter.textContent = start + label;
                    requestAnimationFrame(updateCounter);
                } else {
                    // Set final value precisely
                    counter.textContent = target + label; 
                }
            };
            
            // Start the animation
            requestAnimationFrame(updateCounter);
        });
    };

    // --- Observer Logic (To start animation when section is visible) ---
    if (counterSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounterAnimation();
                    // Stop observing once the animation has started
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.5 // Start animation when 50% of the section is visible
        });

        observer.observe(counterSection);
    }
});