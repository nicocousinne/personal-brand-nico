const themeButton = document.querySelector("#tema");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const emailAddress = "Nico.cousinne@gmail.com";

function applyTheme(isDark) {
    document.body.classList.toggle("morkt", isDark);
    if (themeButton) {
        themeButton.innerHTML = isDark ? '☀ <span>Ljust läge</span>' : '☾ <span>Mörkt läge</span>';
        themeButton.setAttribute("aria-label", isDark ? "Växla till ljust läge" : "Växla till mörkt läge");
        themeButton.setAttribute("aria-pressed", String(isDark));
    }
    if (themeMeta) themeMeta.setAttribute("content", isDark ? "#111111" : "#faf8f4");
}

try {
    applyTheme(localStorage.getItem("nicolas-theme") === "dark");
} catch {
    applyTheme(false);
}

if (themeButton) {
    themeButton.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("morkt");
        applyTheme(isDark);
        try { localStorage.setItem("nicolas-theme", isDark ? "dark" : "light"); } catch { /* Temat fungerar även utan lagring. */ }
    });
}

const copyButton = document.querySelector("#kopiera");
if (copyButton) {
    copyButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            copyButton.textContent = "Kopierat!";
            copyButton.setAttribute("aria-label", "E-postadressen har kopierats");
        } catch {
            window.location.href = `mailto:${emailAddress}`;
            copyButton.textContent = "Öppnar e-post";
        }
        window.setTimeout(() => {
            copyButton.textContent = "Kopiera";
            copyButton.setAttribute("aria-label", "Kopiera e-postadress");
        }, 2500);
    });
}

const progressFill = document.querySelector("#scroll-progress-fill");
const ambientLayer = document.querySelector(".ambient-bg");
const scrollOrb = document.querySelector(".scroll-orb");
function updateReadingProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const boundedProgress = Math.min(1, Math.max(0, progress));
    if (progressFill) progressFill.style.transform = `scaleX(${boundedProgress})`;

    if (ambientLayer && scrollOrb && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const orbSize = scrollOrb.offsetWidth;
        const x = Math.max(12, Math.min(window.innerWidth - orbSize - 12, window.innerWidth * (0.73 - 0.5 * boundedProgress)));
        const y = window.innerHeight * (0.07 + 0.58 * boundedProgress);
        ambientLayer.style.setProperty("--scroll-orb-x", `${x}px`);
        ambientLayer.style.setProperty("--scroll-orb-y", `${y}px`);
        ambientLayer.style.setProperty("--scroll-orb-rotation", `${-18 + 72 * boundedProgress}deg`);
    }
}
let scrollUpdateQueued = false;
function scheduleScrollUpdate() {
    if (scrollUpdateQueued) return;
    scrollUpdateQueued = true;
    window.requestAnimationFrame(() => {
        scrollUpdateQueued = false;
        updateReadingProgress();
    });
}
window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
window.addEventListener("resize", scheduleScrollUpdate);
updateReadingProgress();

// Skifta bakgrundens färgton när besökaren rör sig mellan sidans sektioner.
if ("IntersectionObserver" in window) {
    const sections = document.querySelectorAll("main > section[id]");
    const sectionObserver = new IntersectionObserver((entries) => {
        const activeSection = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (activeSection) document.body.dataset.activeSection = activeSection.target.id;
    }, { rootMargin: "-40% 0px -48% 0px", threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const elements = document.querySelectorAll(".section, .project-card, .lia-section");
    elements.forEach((element) => element.classList.add("reveal-on-scroll"));
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
}
