// ==========================================================================
// Temabyte: knappen med id="tema" som byter mellan ljust och mörkt läge
// ==========================================================================
const temaKnapp = document.querySelector("#tema");

function vaxlaTema() {
    document.body.classList.toggle("morkt");
    const arMorkt = document.body.classList.contains("morkt");
    if (temaKnapp) {
        temaKnapp.innerHTML = arMorkt ? "☀️ Ljust läge" : "🌙 Mörkt läge";
        temaKnapp.setAttribute("aria-label", arMorkt ? "Växla till ljust läge" : "Växla till mörkt läge");
    }
}

if (temaKnapp) {
    temaKnapp.addEventListener("click", vaxlaTema);
}

// ==========================================================================
// Funktioner för eventuella extra knappar (Visa mer och Kopiera mejl)
// ==========================================================================
const knapp = document.querySelector("#visa-mer");
const mer = document.querySelector("#mer");

if (mer) {
    mer.classList.add("gomd");
}

function visaMer() {
    if (mer && knapp) {
        mer.classList.toggle("gomd");
        if (mer.classList.contains("gomd")) {
            knapp.textContent = "Visa mer";
            knapp.setAttribute("aria-expanded", "false");
        } else {
            knapp.textContent = "Visa mindre";
            knapp.setAttribute("aria-expanded", "true");
        }
    }
}

if (knapp) {
    knapp.addEventListener("click", visaMer);
}

const kopiera = document.querySelector("#kopiera");

function kopieraMail() {
    navigator.clipboard.writeText("Nico.cousinne@gmail.com");
    if (kopiera) {
        kopiera.textContent = "Kopierat!";
        setTimeout(() => {
            kopiera.textContent = "Kopiera";
        }, 2500);
    }
}

if (kopiera) {
    kopiera.addEventListener("click", kopieraMail);
}

// Läsprogress högst upp på sidan.
const progressFyllning = document.querySelector("#scroll-progress-fill");

function uppdateraLasprogress() {
    if (!progressFyllning) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    progressFyllning.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
}

window.addEventListener("scroll", uppdateraLasprogress, { passive: true });
window.addEventListener("resize", uppdateraLasprogress);
uppdateraLasprogress();

// Låt sektioner och kort tona in när de kommer in i vyn.
if ("IntersectionObserver" in window) {
    const elementerAttVisa = document.querySelectorAll("main section:not(.hero), .kort");
    elementerAttVisa.forEach((element) => element.classList.add("reveal-on-scroll"));

    const visningsObserver = new IntersectionObserver((poster) => {
        poster.forEach((post) => {
            if (post.isIntersecting) {
                post.target.classList.add("is-visible");
                visningsObserver.unobserve(post.target);
            }
        });
    }, { threshold: 0.12 });

    elementerAttVisa.forEach((element) => visningsObserver.observe(element));
}

