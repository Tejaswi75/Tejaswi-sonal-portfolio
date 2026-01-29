/* =========================================================
  Main JS
  - Theme toggle (light/dark) + persistence
  - Accent hue picker + persistence
  - Mobile menu toggle
  - Scroll progress
  - Scroll spy (active nav links)
  - Reveal animations
  - Project modal (dialog)
  - Copy-to-clipboard + toast
  - Contact form mailto
========================================================= */

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const toastEl = $("#toast");
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    window.clearTimeout(toastEl._t);
    toastEl._t = window.setTimeout(() => toastEl.classList.remove("show"), 1600);
  }

  // ---------------------------
  // Theme (light/dark)
  // ---------------------------
  const themeToggle = $("#themeToggle");
  const storedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

  function applyTheme(mode) {
    document.body.classList.toggle("light", mode === "light");
    localStorage.setItem("theme", mode);
    // Update theme-color for mobile browser UI
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", mode === "light" ? "#f7f9ff" : "#0b1220");
  }

  applyTheme(storedTheme || (prefersLight ? "light" : "dark"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.contains("light");
      applyTheme(isLight ? "dark" : "light");
      toast(isLight ? "Dark theme" : "Light theme");
    });
  }

  // ---------------------------
  // Accent hue picker
  // ---------------------------
  const accentButtons = $$(".accent__btn");
  const storedHue = localStorage.getItem("hue");

  function applyHue(hue) {
    document.documentElement.style.setProperty("--hue", String(hue));
    localStorage.setItem("hue", String(hue));
    accentButtons.forEach((b) => b.classList.toggle("active", b.dataset.hue === String(hue)));
  }

  applyHue(storedHue || 270);

  accentButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyHue(btn.dataset.hue);
      toast("Accent updated");
    });
  });

  // ---------------------------
  // Mobile menu
  // ---------------------------
  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");

  function setMenuOpen(open) {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = !mobileMenu.hidden;
      setMenuOpen(!isOpen);
    });

    $$(".mobile-menu__link", mobileMenu).forEach((a) => {
      a.addEventListener("click", () => setMenuOpen(false));
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      const target = e.target;
      const isInside = mobileMenu.contains(target) || menuToggle.contains(target);
      if (!isInside) setMenuOpen(false);
    });
  }

  // ---------------------------
  // Scroll progress
  // ---------------------------
  const bar = $("#scrollProgressBar");
  function updateProgress() {
    if (!bar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = pct.toFixed(2) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // ---------------------------
  // Reveal animations
  // ---------------------------
  const revealEls = $$(".reveal");
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealIO.observe(el));

  // ---------------------------
  // Scroll spy (active nav)
  // ---------------------------
  const navLinks = $$(".nav__link");
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const spyIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
  );

  sections.forEach((s) => spyIO.observe(s));

  // ---------------------------
  // Copy to clipboard
  // ---------------------------
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied");
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      toast("Copied");
    }
  }

  $$("[data-copy]").forEach((el) => {
    el.addEventListener("click", () => copyText(el.getAttribute("data-copy")));
  });

  // ---------------------------
  // Projects render + modal
  // ---------------------------
  const grid = $("#projectsGrid");
  const modal = $("#projectModal");
  const modalTitle = $("#modalTitle");
  const modalMeta = $("#modalMeta");
  const modalDesc = $("#modalDesc");
  const modalBullets = $("#modalBullets");
  const modalTech = $("#modalTech");
  const modalLive = $("#modalLive");
  const modalRepo = $("#modalRepo");

  function renderProjects() {
    if (!grid || !window.PORTFOLIO) return;

    const { projects } = window.PORTFOLIO;
    grid.innerHTML = "";

    projects.forEach((p) => {
      const card = document.createElement("article");
      card.className = "card project reveal";
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <div class="project__head">
          <h3 class="project__title">${escapeHtml(p.title)}</h3>
          <span class="tag">${escapeHtml(p.period)}</span>
        </div>
        <p class="project__desc">${escapeHtml(p.description)}</p>

        <div class="project__footer">
          <div class="project__actions">
            <button class="project__btn" type="button" data-open="${escapeHtml(p.id)}">
              View details <span aria-hidden="true">→</span>
            </button>
            ${p.live ? `<a class="project__btn" href="${escapeAttr(p.live)}" target="_blank" rel="noreferrer">Live <span aria-hidden="true">↗</span></a>` : ""}
            ${p.repo ? `<a class="project__btn" href="${escapeAttr(p.repo)}" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>` : ""}
          </div>
          <div class="project__meta">${escapeHtml((p.tech || []).slice(0, 3).join(" • "))}</div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Newly inserted reveals: observe them
    $$(".reveal", grid).forEach((el) => revealIO.observe(el));

    // Open handlers
    $$("[data-open]", grid).forEach((btn) => {
      btn.addEventListener("click", () => openProject(btn.getAttribute("data-open")));
    });

    // Keyboard open
    $$(".project", grid).forEach((card) => {
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const openBtn = card.querySelector("[data-open]");
          if (openBtn) openBtn.click();
        }
      });
    });
  }

  function openProject(id) {
    const p = (window.PORTFOLIO?.projects || []).find((x) => x.id === id);
    if (!p || !modal) return;

    modalTitle.textContent = p.title;
    modalMeta.textContent = p.period;

    modalDesc.textContent = p.description;

    // bullets
    modalBullets.innerHTML = "";
    (p.highlights || []).forEach((h) => {
      const li = document.createElement("li");
      li.textContent = h;
      modalBullets.appendChild(li);
    });

    // tech chips
    modalTech.innerHTML = "";
    (p.tech || []).forEach((t) => {
      const span = document.createElement("span");
      span.className = "chip";
      span.textContent = t;
      modalTech.appendChild(span);
    });

    // links
    if (p.live) {
      modalLive.href = p.live;
      modalLive.style.display = "";
      modalLive.setAttribute("aria-disabled", "false");
    } else {
      modalLive.href = "#";
      modalLive.style.display = "none";
      modalLive.setAttribute("aria-disabled", "true");
    }

    if (p.repo) {
      modalRepo.href = p.repo;
      modalRepo.style.display = "";
      modalRepo.setAttribute("aria-disabled", "false");
    } else {
      modalRepo.href = "#";
      modalRepo.style.display = "none";
      modalRepo.setAttribute("aria-disabled", "true");
    }

    modal.showModal();
  }

  // Basic escaping for safe DOM injection
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  function escapeAttr(str) {
    return escapeHtml(str).replace(/\s/g, "%20");
  }

  renderProjects();

  // ---------------------------
  // Contact form (mailto)
  // ---------------------------
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#name")?.value?.trim() || "";
      const subject = $("#subject")?.value?.trim() || "Portfolio Contact";
      const message = $("#message")?.value?.trim() || "";

      const body = [
        `Hi Tejaswi,`,
        ``,
        message,
        ``,
        `— ${name || "Someone"}`
      ].join("\n");

      const mailto = `mailto:${encodeURIComponent(window.PORTFOLIO?.person?.email || "tejaswisonal2@gmail.com")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }

  // ---------------------------
  // Footer year
  // ---------------------------
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---------------------------
  // Optional: register service worker (safe offline caching)
  // ---------------------------
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    });
  }
})();
