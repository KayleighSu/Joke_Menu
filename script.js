const dayCards = document.querySelectorAll(".day-card");
const dayLinks = document.querySelectorAll(".day-nav a");

const visibleDay = new IntersectionObserver(
    (entries) => {
        const current = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!current) return;

        dayLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${current.target.id}`;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    },
    { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.25, 0.5] }
);

dayCards.forEach((card) => visibleDay.observe(card));

dayLinks.forEach((link) => {
    link.addEventListener("click", () => {
        dayLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
    });
});
