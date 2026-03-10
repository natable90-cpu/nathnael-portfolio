// Custom cursor with smooth trailing movement + footer year
(function () {
    const cursor = document.getElementById("cursor");
    const hoverTargets = document.querySelectorAll("[data-hover]");

    let mouseX = 0,
        mouseY = 0;
    let posX = 0,
        posY = 0;
    const speed = 0.2;
    let cursorVisible = true;

    if (!cursor) {
        // Still set the year and exit if cursor element is missing
        const yearSpanSafe = document.getElementById("year");
        if (yearSpanSafe) yearSpanSafe.textContent = new Date().getFullYear();
        return;
    }

    // Track mouse
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!cursorVisible) {
            cursor.classList.remove("cursor--hidden");
            cursorVisible = true;
        }
    });

    // Smooth animation
    function animateCursor() {
        posX += (mouseX - posX) * speed;
        posY += (mouseY - posY) * speed;
        cursor.style.transform = `translate(${posX}px, ${posY}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
        cursor.classList.add("cursor--hidden");
        cursorVisible = false;
    });

    // Hover effect
    hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("cursor--hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("cursor--hover"));
    });

    // Footer year
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();

