document.addEventListener("DOMContentLoaded", async () => {
  await loadPartial("./partials/header.html", "#site-header");
  await loadPartial("./partials/footer.html", "#site-footer");
  setupMobileNav();
  setActiveNavLink();
  setupRevealObserver();
});
/* =========================================================
   PARTIAL LOADING
   ========================================================= */
async function loadPartial(url, selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  try {
    const response = await fetch(url, {
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error(`Failed to load ${url}`);
    }
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    target.innerHTML = "";
  }
}
/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */
function setupMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!header || !toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    header.classList.remove("nav-open");
    toggle.setAttribute(
      "aria-expanded",
      "false"
    );
  });
}
/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */
function setActiveNavLink() {
  const currentPath = normalizePath(
    window.location.pathname
  );
  document
    .querySelectorAll(".site-nav a")
    .forEach((link) => {
      const linkPath = normalizePath(
        new URL(link.href).pathname
      );
      if (linkPath === currentPath) {
        link.classList.add("is-active");
      }
    });
}
/* =========================================================
   PATH NORMALIZATION
   ========================================================= */
function normalizePath(path) {
  if (
    path.endsWith("/") &&
    path !== "/"
  ) {
    return path.slice(0, -1);
  }
  return path;
}
/* =========================================================
   SCROLL REVEAL OBSERVER
   ========================================================= */
function setupRevealObserver() {
  /*
     Respect users who prefer reduced motion.
     In this case everything should render normally.
  */
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reducedMotion) {
    document
      .querySelectorAll(
        ".reveal, .reveal-stagger, .image-reveal"
      )
      .forEach((element) => {
        element.classList.add("is-visible");
      });
    return;
  }
  /*
     Automatically add the default reveal behavior
     to major page sections.
     Pages can opt out with:
     data-reveal="none"
  */
  document
    .querySelectorAll(
      ".section, .page-hero"
    )
    .forEach((element) => {
      if (
        element.dataset.reveal === "none"
      ) {
        return;
      }
      if (
        !element.classList.contains("reveal") &&
        !element.classList.contains("reveal-stagger")
      ) {
        element.classList.add("reveal");
      }
    });
  /*
     Observe all reveal elements.
  */
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-stagger, .image-reveal"
  );
  if (!revealElements.length) return;
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(
          "is-visible"
        );
        /*
           Once an element has entered the viewport,
           stop observing it. This prevents the animation
           from repeatedly firing while scrolling.
        */
        observerInstance.unobserve(
          entry.target
        );
      });
    },
    {
      threshold:0.12,
      rootMargin:
        "0px 0px -60px 0px"
    }
  );
  revealElements.forEach((element) => {
    observer.observe(element);
  });
}
