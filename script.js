//smotth scroll
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)



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
// optional
    card.style.transition = `
  transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
  width 0.4s ease,
  height 0.4s ease
`;
//optional




});
// play/pause animation
const triangle = document.querySelector('.playTriangle');
triangle.addEventListener('click', ()=> {
    triangle.classList.toggle('active');

});
let lastScroll = window.scrollY;
let frequencyOffset = 0;

window.addEventListener("scroll", () => {
    const current = window.scrollY;
    const delta = Math.abs(current - lastScroll);

    // Je schneller gescrollt wird → desto stärker der Effekt
    frequencyOffset += delta * 0.15;

    document.querySelector('.frequency-bg').style.backgroundPositionY =
        frequencyOffset + "px";

    lastScroll = current;
});


document.querySelectorAll('.w-bubble').forEach(bubble => {
  bubble.addEventListener('click', () => {

    // Wenn offen → schließen
    if (bubble.classList.contains('expanded')) {

      bubble.classList.add('closing');
      bubble.classList.remove('expanded');

      setTimeout(() => {
        bubble.classList.remove('closing');
      }, 600);

      return;
    }

    // Andere schließen
    document.querySelectorAll('.w-bubble.expanded')
      .forEach(b => {
        b.classList.remove('expanded');
        b.classList.add('closing');
        setTimeout(() => b.classList.remove('closing'), 600);
      });

    // Diese öffnen
    bubble.classList.add('expanded');
  });
});
const panels = document.querySelectorAll(".section-panel");

window.addEventListener("scroll", () => {
  const windowH = window.innerHeight;

  panels.forEach(panel => {
    const rect = panel.getBoundingClientRect();

    // 0 = Section noch nicht da
    // 1 = Section komplett im View
    const progress = 2 - Math.min(Math.max(rect.top / windowH, 0), 1);

    // Licht wird schwächer je weiter man scrollt
    const lightStrength = 2 - progress;

    panel.style.setProperty("--light-opacity", lightStrength);
  });
});
const titles = document.querySelectorAll('.section-title');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    }
  });
}, {
  threshold: 0.4
});

titles.forEach(title => observer.observe(title));

function updateBubbles() {
  const windowH = window.innerHeight;

  document.querySelectorAll('.w-bubble-wrapper').forEach(wrapper => {
    const rect = wrapper.getBoundingClientRect();

    // Sichtbarkeit: 0 = komplett oben, 1 = komplett im View
    let progress = 1 - Math.min(Math.max(rect.top / windowH, 0), 1);

    // Optional: kleiner Schwellwert, damit Fade-In erst ab 10% sichtbar startet
    if(progress > 0.1) {
      wrapper.style.opacity = progress;             // Opacity
      wrapper.style.transform = `translateY(${30*(1-progress)}px)`; // Slide
    } else {
      wrapper.style.opacity = 0;
      wrapper.style.transform = `translateY(30px)`;
    }
  });
}
const bubbleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const wrapper = entry.target;

      // Bubble sichtbar machen
      wrapper.classList.add("reveal");

      // Wenn das die erste Bubble ist → Frequenz starten
      if (wrapper.classList.contains("seed-1")) {
        setTimeout(() => {
          document.querySelectorAll(".frequency").forEach(freq => {
            freq.classList.add("show");
          });
        }, 800); // 2 Sekunden warten
      }
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".w-bubble-wrapper")
  .forEach(b => bubbleObserver.observe(b));










