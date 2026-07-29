
document.addEventListener("DOMContentLoaded", async () => {
  await loadPartial("./partials/header.html", "#site-header");
  await loadPartial("./partials/footer.html", "#site-footer");

  setCurrentYear();
  setupMobileNav();
  setActiveNavLink();
});

async function loadPartial(url, selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    target.innerHTML = "";
  }
}

function setCurrentYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

function setupMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!header || !toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setActiveNavLink() {
  const currentPath = normalizePath(window.location.pathname);
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const linkPath = normalizePath(new URL(link.href).pathname);
    if (linkPath === currentPath) {
      link.classList.add("is-active");
    }
  });
}

function normalizePath(path) {
  if (path.endsWith("/") && path !== "/") return path.slice(0, -1);
  return path;
}
