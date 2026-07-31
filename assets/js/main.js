(function () {
  "use strict";

  var toggle = document.querySelector("[data-nav-toggle]");
  var links = document.querySelector("[data-nav-links]");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.getAttribute("data-open") === "true";
      links.setAttribute("data-open", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var animated = document.querySelectorAll("[data-animate]");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (animated.length && "IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    animated.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animated.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
