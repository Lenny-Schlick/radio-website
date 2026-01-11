let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");

const COMPACT_AT = 50;
const HIDE_AT = 150;
const section = document.querySelector('.zoom-section');
const card = document.querySelector('.zoom-card');

window.addEventListener("scroll", () => {
    const current = window.scrollY;

    // // -------------------------
    // // 1. NAVBAR LOGIK
    // // -------------------------
    if (current > COMPACT_AT) {
        navbar.classList.add("compact");
    } else {
        navbar.classList.remove("compact");
    }

    if (current > HIDE_AT && current > lastScrollY) {
        navbar.classList.add("hidden");
    } else {
        navbar.classList.remove("hidden");
    }

    lastScrollY = current;












    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Wie viel der Section ist sichtbar?
    const visible = Math.min(windowHeight, Math.max(0, windowHeight - rect.top));

    // Fortschritt 0 → 1
    let progress = visible / windowHeight;
    progress = Math.max(0, Math.min(1, progress));

    // Skalierung: 0.5 → 1.0
    const scale = 0.5 + progress * (1.0 - 0.5);

    // Breite: 50vw → 80vw
    const startWidth = 50;
    const endWidth = 80;
    const width = startWidth + progress * (endWidth - startWidth);
    card.style.width = width + "vw";

    // Höhe: 200px → 80vh
    const startHeight = 200;
    const endHeight = windowHeight * 0.8;
    const height = startHeight + progress * (endHeight - startHeight);
    card.style.height = height + "px";

    // Y-Bewegung: 40px → 0px (leicht nach oben gleiten)
    const startY = 40;
    const endY = 50;
    const translateY = startY + progress * (endY - startY);

    // Blur: 0px → 8px
    const startBlur = 0;
    const endBlur = 8;
    const blur = startBlur + progress * (endBlur - startBlur);

    // Hintergrund unscharf machen
    card.style.backdropFilter = `blur(${blur}px)`;
    card.style.webkitBackdropFilter = `blur(${blur}px)`;




    // Transform kombinieren
    card.style.transform = `scale(${scale}) translateY(${translateY}px)`;






});
