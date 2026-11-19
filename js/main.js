/* ============================================================
   8055 — interactive bits
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  /* ----- Mobile navigation ----- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    function setMenu(open) {
      toggle.classList.toggle("open", open);
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenu(!nav.classList.contains("open"));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !toggle.contains(e.target)) {
        setMenu(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) setMenu(false);
    });
  }

  /* ----- Shop filters ----- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var products = document.querySelectorAll(".shop-grid .product-card");
  var countEl = document.querySelector(".result-count");
  if (filterBtns.length && products.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-filter");
        var shown = 0;
        products.forEach(function (p) {
          var match = cat === "all" || p.getAttribute("data-category") === cat;
          p.classList.toggle("hidden", !match);
          if (match) shown++;
        });
        if (countEl) countEl.textContent = "Showing " + shown + " product" + (shown === 1 ? "" : "s");
      });
    });
  }

  /* ----- FAQ accordion ----- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentElement;
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("open"); });
      if (!wasOpen) item.classList.add("open");
    });
  });

  /* ----- Forms (demo only) ----- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("formMsg");
      if (msg) {
        msg.textContent = "Thank you — your message has been received. We'll get back to you soon.";
        msg.classList.add("show");
      }
      contactForm.reset();
    });
  }

  var newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      var btn = form.querySelector("button");
      if (!input || !input.value) return;
      var old = btn.textContent;
      btn.textContent = "Subscribed ✓";
      input.value = "";
      setTimeout(function () { btn.textContent = old; }, 3000);
    });
  });

  /* ----- Scroll reveal ----- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ----- Current year ----- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
