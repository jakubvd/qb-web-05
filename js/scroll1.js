document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("scroll-button-bio"); // Button by ID
    const targetSection = document.getElementById("target-section-bio"); // Section by ID

    if (button && targetSection) {
        button.addEventListener("click", function () {
            const targetY = targetSection.getBoundingClientRect().top + window.scrollY; // Get absolute position
            const currentY = window.scrollY; // Get current scroll position
            const distance = Math.abs(targetY - currentY); // Calculate distance

            const duration = Math.min(Math.max(distance / 1000, 0.5), 2); // Smooth dynamic duration (0.5s min - 2s max)

            gsap.to(window, {
                duration: duration,
                scrollTo: { y: targetY, autoKill: true },
                ease: "power2.inOut"
            });
        });
    }
});