

// Loader
window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("loader").classList.add("loader-hidden"),
    300,
  );
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
});

// Navbar background on scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("glass", "shadow-lg");
  } else {
    navbar.classList.remove("glass", "shadow-lg");
  }
});

// Parallax hero
const parallaxBg = document.getElementById("parallaxBg");
window.addEventListener(
  "scroll",
  () => {
    const offset = window.scrollY;
    if (offset < window.innerHeight) {
      parallaxBg.style.transform = `translateY(${offset * 0.3}px)`;
    }
  },
  { passive: true },
);

// Intersection Observer scroll reveal
const animatedEls = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
animatedEls.forEach((el) => observer.observe(el));

// Counter animation
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 60));
        const update = () => {
          current += increment;
          if (current >= target) {
            el.textContent = target.toLocaleString("tr-TR");
          } else {
            el.textContent = current.toLocaleString("tr-TR");
            requestAnimationFrame(update);
          }
        };
        update();
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
counters.forEach((c) => counterObserver.observe(c));

// FAQ accordion
document.querySelectorAll(".faq-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector("i");
    const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

    document
      .querySelectorAll(".accordion-content")
      .forEach((c) => (c.style.maxHeight = "0px"));
    document
      .querySelectorAll(".faq-btn i")
      .forEach((i) => i.classList.remove("rotate-45"));

    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.classList.add("rotate-45");
    }
  });
});

// Smooth scroll for nav links (native scroll-behavior already handles most cases)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  });
});
