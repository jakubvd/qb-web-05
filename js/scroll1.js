document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("scroll-button-bio"); // Button by ID
    const targetSection = document.getElementById("target-section-bio"); // Section by ID

    if (button && targetSection) {
        button.addEventListener("click", function () {
            const isMobile = window.matchMedia("(max-width: 991px)").matches; // Check viewport width

            let targetY = targetSection.getBoundingClientRect().top + window.scrollY; // Get absolute position
            if (isMobile) {
                targetY -= 100; // Add offset for mobile
            }

            const currentY = window.scrollY; // Get current scroll position
            const distance = Math.abs(targetY - currentY); // Calculate distance

            let duration = Math.min(Math.max(distance / 1000, 0.5), 2); // Base duration (0.5s min - 2s max)
            if (isMobile) {
                duration *= 2; // Slow down animation 2x on mobile
            }

            gsap.to(window, {
                duration: duration,
                scrollTo: { y: targetY, autoKill: true },
                ease: "power3.inOut"
            });
        });
    }
});