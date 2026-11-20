/* ============================================================
   moggie.dev — Portfolio interactions
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav: scrolled state + active link ---------- */
  var nav = document.getElementById("nav");
  var navLinks = document.querySelectorAll(".nav-links a:not(.btn)");
  var sections = document.querySelectorAll("main section[id]");

  function currentSectionId() {
    var marker = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0] ? sections[0].id : null;

    sections.forEach(function (section) {
      if (section.offsetTop <= marker) current = section.id;
    });

    // At the very bottom of the page, highlight Contact
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      current = "contact";
    }
    return current;
  }

  function updateNav() {
    nav.classList.toggle("scrolled", window.scrollY > 24);

    var activeId = currentSectionId();
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + activeId;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("nav-toggle");
  var linksPanel = document.getElementById("nav-links");

  function closeMenu() {
    toggle.classList.remove("open");
    linksPanel.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", function () {
    var isOpen = linksPanel.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close the mobile menu when a link is chosen or the user clicks outside
  linksPanel.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("click", function (e) {
    if (
      linksPanel.classList.contains("open") &&
      !linksPanel.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ---------- Reveal on scroll (with stagger) ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  } else {
    revealEls.forEach(function (el) {
      var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
      if (delay) el.style.transitionDelay = delay * 70 + "ms";
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Bind scroll handler ---------- */
  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        updateNav();
        ticking = false;
      });
    },
    { passive: true }
  );

  updateNav();
})();
