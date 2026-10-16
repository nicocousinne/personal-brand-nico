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

