const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

const onScroll = () => header?.classList.toggle("is-scrolled", scrollY > 12);
onScroll();
addEventListener("scroll", onScroll, { passive: true });

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mobileMenu.hidden = open;
  document.body.classList.toggle("menu-open", !open);
});

mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
}));

document.querySelectorAll("[data-accordion]").forEach((item) => {
  const trigger = item.querySelector(".accordion-trigger");
  const panel = item.querySelector(".accordion-panel");
  trigger.addEventListener("click", () => {
    const open = item.classList.contains("is-open");
    document.querySelectorAll("[data-accordion]").forEach((other) => {
      other.classList.remove("is-open");
      other.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
      other.querySelector(".accordion-panel").hidden = true;
    });
    if (!open) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      panel.hidden = false;
    }
  });
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll("[data-book]").forEach((link) => link.addEventListener("click", () => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "book_appointment_click", {
    send_to: "G-RPRJ3EXC0G",
    booking_location: "Richmond",
    booking_url: link.href
  });
}));
