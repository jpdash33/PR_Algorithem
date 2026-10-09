// Reveal elements when they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(section => {
    revealObserver.observe(section);
});


// Update active sidebar link while scrolling
const sections = document.querySelectorAll(
    "#intro, #terms, #g_theory, #PR, #practical"
);

const sidebarLinks = document.querySelectorAll(".sidebar-link");

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sidebarLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, {
    rootMargin: "-20% 0px -65% 0px"
});

sections.forEach(section => {
    sectionObserver.observe(section);
});


// Close the active-link animation and follow native anchor navigation
sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
        sidebarLinks.forEach(item => item.classList.remove("clicked"));
        link.classList.add("clicked");
    });
});
