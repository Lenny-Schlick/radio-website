let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");

const COMPACT_AT = 50;
const HIDE_AT = 150;

window.addEventListener("scroll", () => {
    const current = window.scrollY;

    // Stufe 1: Navbar kleiner machen
    if (current > COMPACT_AT) {
        navbar.classList.add("compact");
    } else {
        navbar.classList.remove("compact");
    }

    // Stufe 2: Navbar verstecken
    if (current > HIDE_AT && current > lastScrollY) {
        navbar.classList.add("hidden");
    } else {
        navbar.classList.remove("hidden");
    }

    lastScrollY = current;
});
